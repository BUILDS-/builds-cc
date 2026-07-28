function normalize(url: string) {
  if (url != "/" && url.endsWith("/")) {
    return url.slice(0, -1);
  }

  // console.log(url);
  return url;
}

export function matchActiveLink(url: string, hrefs: string[]): string | null {
  const normalizedUrl = normalize(url);
  const active = hrefs.find((href) => {
    const normalizedHref = normalize(href);
    // console.log(normalizedUrl, normalizedHref);
    return normalizedHref === normalizedUrl;
  });
  return active ?? null;
}
