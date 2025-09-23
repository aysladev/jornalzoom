import { ID, Query } from "appwrite";
import { storage, client, tablesDB } from "../config/config";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE;

async function uploadTextImages(textImages) {
  if (!textImages || textImages.length === 0) return [];

  const uploads = await Promise.all(
    textImages.map(async (item) => {
      if (!item.image) return null;

      const upload = await storage.createFile({
        bucketId: BUCKET_ID,
        fileId: ID.unique(),
        file: item.image
      });

      const fileUrl =
        client.config.endpoint +
        `/storage/buckets/${BUCKET_ID}/files/${upload.$id}/view?project=${client.config.project}`;

      return {
        imageUrl: fileUrl,
        source: item.source,
        description: item.description
      };
    })
  );

  return uploads.filter(Boolean);
}

export async function createPost(matter, image, textImages) {
  try {
    const promise = await storage.createFile({
      bucketId: BUCKET_ID,
      fileId: ID.unique(),
      file: image
    });

    const imageUrl =
      client.config.endpoint +
      `/storage/buckets/${BUCKET_ID}/files/${promise.$id}/view?project=${client.config.project}`;

    const mappedTextImages =
      textImages && textImages.length > 0 ? await uploadTextImages(textImages) : "";

    const matterBody = {
      ...matter,
      matter_image: imageUrl,
      textImages: mappedTextImages ? JSON.stringify(mappedTextImages) : ""
    };

    const newPost = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: matterBody
    });

    return newPost;
  } catch (error) {
    console.error("Erro ao criar post:", error);
  }
}

export async function getUniquePost(rowId) {
  try {
    const newPost = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId
    });
    return newPost;
  } catch (error) {
    console.error("Erro ao recuperar post:", error);
  }
}

export async function getAllPosts(limit = 6) {
  try {
    const newPost = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(limit), Query.orderDesc("$createdAt")]
    });
    return newPost;
  } catch (error) {
    console.error("Erro ao recuperar posts:", error);
  }
}

export async function getAllPostsBySection(limit = 6, sectionId) {
  try {
    const newPost = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [
        Query.limit(limit),
        Query.orderDesc("$createdAt"),
        Query.equal("displayLocation", sectionId)
      ]
    });
    return newPost;
  } catch (error) {
    console.error("Erro ao recuperar posts:", error);
  }
}
