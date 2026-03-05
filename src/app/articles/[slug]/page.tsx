import { ARTICLES } from "@/content";

export default async function ArticlePage(
  props: PageProps<"/articles/[slug]">,
) {
  const { slug } = await props.params;

  const found = ARTICLES.find((article) => article.slug === slug);

  return (
    <div>
      <h3>{slug}</h3>
      <p>{found?.title}</p>
    </div>
  );
}
