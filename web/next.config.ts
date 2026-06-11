import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // No Turbopack, plugins são passados por nome (string), não como função
    // importada — funções não cruzam a fronteira JS↔Rust. remark-gfm habilita
    // tabelas, listas de tarefas e outras extensões do GitHub-flavored Markdown.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
