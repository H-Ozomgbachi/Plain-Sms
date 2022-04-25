export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const autoLinkClick = (href: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_self";
  document.body.appendChild(link);
  link.click();
};
