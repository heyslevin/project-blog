import React from "react";

import BlogHero from "@/components/BlogHero";
import dynamic from "next/dynamic";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";

import COMPONENT_MAP from "@/helpers/mdx-components";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract.substring(0, 52),
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        {/* {content} */}
        <MDXRemote components={COMPONENT_MAP} source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
