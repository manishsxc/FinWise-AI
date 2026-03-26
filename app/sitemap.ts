import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://finwise.ai'; const now = new Date();
  return [
    {url:`${base}/`,lastModified:now,changeFrequency:'weekly',priority:1.0},
    {url:`${base}/features`,lastModified:now,changeFrequency:'weekly',priority:0.95},
    {url:`${base}/pricing`,lastModified:now,changeFrequency:'monthly',priority:0.9},
    {url:`${base}/about`,lastModified:now,changeFrequency:'monthly',priority:0.8},
    {url:`${base}/contact`,lastModified:now,changeFrequency:'monthly',priority:0.7},
    {url:`${base}/blog`,lastModified:now,changeFrequency:'daily',priority:0.85},
    {url:`${base}/careers`,lastModified:now,changeFrequency:'weekly',priority:0.7},
    {url:`${base}/investors`,lastModified:now,changeFrequency:'monthly',priority:0.75},
    {url:`${base}/segments/individual`,lastModified:now,changeFrequency:'monthly',priority:0.9},
    {url:`${base}/segments/business`,lastModified:now,changeFrequency:'monthly',priority:0.9},
    {url:`${base}/segments/professional`,lastModified:now,changeFrequency:'monthly',priority:0.85},
    {url:`${base}/segments/banking`,lastModified:now,changeFrequency:'monthly',priority:0.85},
    {url:`${base}/segments/couple`,lastModified:now,changeFrequency:'monthly',priority:0.8},
    {url:`${base}/segments/nri`,lastModified:now,changeFrequency:'monthly',priority:0.8},
    {url:`${base}/help`,lastModified:now,changeFrequency:'weekly',priority:0.75},
    {url:`${base}/docs`,lastModified:now,changeFrequency:'weekly',priority:0.8},
    {url:`${base}/security`,lastModified:now,changeFrequency:'monthly',priority:0.7},
    {url:`${base}/community`,lastModified:now,changeFrequency:'weekly',priority:0.65},
    {url:`${base}/feedback`,lastModified:now,changeFrequency:'weekly',priority:0.65},
    {url:`${base}/login`,lastModified:now,changeFrequency:'monthly',priority:0.5},
    {url:`${base}/register`,lastModified:now,changeFrequency:'monthly',priority:0.6},
    {url:`${base}/privacy`,lastModified:now,changeFrequency:'monthly',priority:0.4},
    {url:`${base}/terms`,lastModified:now,changeFrequency:'monthly',priority:0.4},
  ];
}
