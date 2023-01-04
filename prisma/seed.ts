import { PrismaClient } from "@prisma/client";

const images = {
  "1": "https://www.arts.gov/sites/default/files/styles/large/public/images/Machine-Hallucination-cropped.jpg?itok=8MvrUsQp",
  "2": "https://cdnb.artstation.com/p/assets/images/images/027/414/065/large/matheus-estofolete-tech-sla.jpg?1591467305",
  "3": "https://c4.wallpaperflare.com/wallpaper/983/687/798/anime-art-anime-girl-wallpaper-preview.jpg",
  "4": "https://w0.peakpx.com/wallpaper/652/346/HD-wallpaper-anime-room-computer-night.jpg",
  "5": "https://w0.peakpx.com/wallpaper/590/584/HD-wallpaper-anime-room-computer-night.jpg",
  "6": "https://i.pinimg.com/originals/71/d4/82/71d4820273a3a96774cd386641080e39.png",
};

const prisma = new PrismaClient();
async function seed() {
  const user = await prisma.user.findUnique({
    where: {
      email: "moutafatin3@gmail.com",
    },
  });

  if (!user) {
    throw Error("User not exists");
  }

  ["1", "2", "3", "4", "5", "6"].map(async (x) => {
    await prisma.article.create({
      data: {
        title: `Article ${x} - Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!`,
        description:
          "Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non.",
        body: "Sunt excepturi ut dolore fuga.\nAutem eum maiores aut nihil magnam corporis consectetur sit. Voluptate et quasi optio eos et eveniet culpa et nobis.\nSint aut sint sequi possimus reiciendis nisi.\nRerum et omnis et sit doloribus corporis voluptas error.\nIusto molestiae tenetur necessitatibus dolorem omnis. Libero sed ut architecto.\nEx itaque et modi aut voluptatem alias quae.\nModi dolor cupiditate sit.\nDelectus consectetur nobis aliquid deserunt sint ut et voluptas.\nCorrupti in labore laborum quod. Ipsa laudantium deserunt. Ut atque harum inventore natus facere sed molestiae.\nQuia aliquid ut.\nAnimi sunt rem et sit ullam dolorem ab consequatur modi. Cupiditate officia voluptatum.\nTenetur facere eum distinctio animi qui laboriosam.\nQuod sed voluptatem et cumque est eos.\nSint id provident suscipit harum odio et. Et fuga repellendus magnam dignissimos eius aspernatur rerum. Quo perferendis nesciunt.\nDolore dolorem porro omnis voluptatibus consequuntur et expedita suscipit et.\nTempora facere ipsa.\nDolore accusamus soluta officiis eligendi.\nEum quaerat neque eum beatae odio. Ad voluptate vel.\nAut aut dolor. Cupiditate officia voluptatum.\nTenetur facere eum distinctio animi qui laboriosam.\nQuod sed voluptatem et cumque est eos.\nSint id provident suscipit harum odio et.",
        slug: `Try-to-transmit-the-HTTP-card-maybe-it-will-override-the-multi-byte-hard-${x}`,
        userId: user.id,
        imageUrl: images[x as keyof typeof images],
        tags: {
          create: [
            {
              name: `tag${x}`,
            },
          ],
        },
      },
    });
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
