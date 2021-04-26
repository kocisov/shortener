import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {slug} = req.query;

  if (req.method === "POST") {
    const {token, url, name} = req.body;

    if (!token || !url || !name) {
      return res.status(400).json({
        success: false,
      });
    }

    const inDatabase = await prisma.token.findFirst({
      where: {
        value: token,
      },
    });

    if (!inDatabase) {
      return res.status(401).json({
        success: false,
      });
    }

    const result = await prisma.slug.create({
      data: {
        name,
        url,
        token: {
          connect: {
            id: inDatabase.id,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  if (!slug) {
    return res.redirect("/");
  }

  const inDatabase = await prisma.slug.findFirst({
    where: {
      name: slug.toString(),
    },
  });

  if (inDatabase) {
    return res.redirect(inDatabase.url);
  }

  res.redirect("/");
}
