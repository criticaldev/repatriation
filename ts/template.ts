const id = (e: any) => {
  return document.getElementById(e) as HTMLElement;
};
const tags = (e: any) => {
  return document.getElementsByTagName(e) as HTMLCollectionOf<HTMLElement>;
};
const classes = (e: any) => {
  return document.getElementsByClassName(e) as HTMLCollectionOf<HTMLElement>;
};
