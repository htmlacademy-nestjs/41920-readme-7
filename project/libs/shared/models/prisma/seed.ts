import { PrismaClient } from '@prisma/client';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      type: 'text',
      status: 'published',
      title: 'Мой первый пост',
      description: 'Это мой первый пост в блоге',
      announce: 'Краткое содержание первого поста',
      postText:
        'Полный текст моего первого поста. Здесь может быть много интересной информации.',
      tags: [{ title: 'блог' }, { title: 'первыйпост' }],
      likes: [{ userId: SECOND_USER_ID }],
    },
    {
      id: SECOND_POST_UUID,
      userId: SECOND_USER_ID,
      type: 'quote',
      status: 'published',
      quoteText: 'Быть или не быть, вот в чем вопрос',
      quoteAuthor: 'Уильям Шекспир',
      tags: [{ title: 'цитата' }, { title: 'шекспир' }],
      likes: [{ userId: FIRST_USER_ID }],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        userId: post.userId,
        type: post.type,
        status: post.status,
        title: post.title,
        description: post.description,
        announce: post.announce,
        postText: post.postText,
        quoteText: post.quoteText,
        quoteAuthor: post.quoteAuthor,
        tags: post.tags
          ? {
              create: post.tags,
            }
          : undefined,
        likes: post.likes
          ? {
              create: post.likes,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
