import getPosts from '@/server/actions/get-posts';

export default async function Home() {
  const { error, data } = await getPosts();

  if (error) {
    throw new Error(error);
  }

  if (data) {
    return (
      <main>
        {data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </main>
    );
  }
}
