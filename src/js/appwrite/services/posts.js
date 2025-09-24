const client = new Appwrite.Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("68cf1e4d003799128002");

const storage = new Appwrite.Storage(client);
const tablesDB = new Appwrite.TablesDB(client);

const BUCKET_ID = "68cf238800133c40b9fb";
const DATABASE_ID = "68cf1e8d0009255d1f4b";
const TABLE_ID = "posts";

async function uploadTextImages(textImages) {
  if (!textImages || textImages.length === 0) return [];

  const uploads = await Promise.all(
    textImages.map(async (item) => {
      if (!item.image) return null;

      const upload = await storage.createFile({
        bucketId: BUCKET_ID,
        fileId: Appwrite.ID.unique(),
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
      fileId: Appwrite.ID.unique(),
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
      rowId: Appwrite.ID.unique(),
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
      queries: [Appwrite.Query.limit(limit), Appwrite.Query.orderDesc("$createdAt")]
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
        Appwrite.Query.limit(limit),
        Appwrite.Query.orderDesc("$createdAt"),
        Appwrite.Query.equal("displayLocation", sectionId)
      ]
    });
    return newPost;
  } catch (error) {
    console.error("Erro ao recuperar posts:", error);
  }
}
