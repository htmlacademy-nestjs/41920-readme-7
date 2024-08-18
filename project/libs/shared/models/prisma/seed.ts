import { PostType, PrismaClient, StatusType } from '@prisma/client';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      type: PostType.TEXT,
      status: StatusType.PUBLISHED,
      title: 'Мой первый пост',
      description: 'Это мой первый пост в блоге',
      announce: 'Краткое содержание первого поста',
      postText:
        'Полный текст моего первого поста. Здесь может быть много интересной информации.',
      tags: ['tag1', 'tag2', 'tag3'],
      likes: [{ postId: FIRST_POST_UUID, userId: SECOND_USER_ID }],
    },
    {
      id: SECOND_POST_UUID,
      userId: SECOND_USER_ID,
      type: PostType.QUOTE,
      status: StatusType.PUBLISHED,
      quoteText: 'Быть или не быть, вот в чем вопрос',
      quoteAuthor: 'Уильям Шекспир',
      tags: ['tag1', 'tag2'],
      likes: [{ postId: SECOND_POST_UUID, userId: FIRST_USER_ID }],
      comments: [
        { postId: SECOND_POST_UUID, userId: FIRST_USER_ID, message: 'Отличная цитата!' },
        { postId: SECOND_POST_UUID, userId: SECOND_USER_ID, message: 'Спасибо!' },
      ],
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
        title: post.title || undefined,
        description: post.description || undefined,
        announce: post.announce || undefined,
        postText: post.postText || undefined,
        quoteText: post.quoteText || undefined,
        quoteAuthor: post.quoteAuthor || undefined,
        publishDate: new Date(),
        isReposted: false,
        likes: {
          create: post.likes.map((like) => ({
            userId: like.userId,
          })),
        },
        comments: post.comments
          ? {
              create: post.comments.map((comment) => ({
                userId: comment.userId,
                message: comment.message,
              })),
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
