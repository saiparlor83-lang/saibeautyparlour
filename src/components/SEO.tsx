import { Helmet } from "react-helmet-async";
import { imageUrl } from '../assets';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  noindex?: boolean;
}

const DEFAULT_DOMAIN = "https://saibeautyparlour.com";
const DEFAULT_IMAGE = `${DEFAULT_DOMAIN}${imageUrl('parlour_frontimg.jpeg')}`;
const DEFAULT_URL = `${DEFAULT_DOMAIN}/`;

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = DEFAULT_URL,
  noindex = false,
}: SEOProps) {
  // Ensure image URL is absolute
  const absoluteImageUrl = image.startsWith("http")
    ? image
    : `${DEFAULT_DOMAIN}${image.startsWith("/") ? "" : "/"}${image}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}
