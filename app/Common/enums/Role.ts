export enum Role {
  AUTHOR = "AUTHOR",
  REVIEWER = "REVIEWER",
}

export const RoleStringRepresentation: Record<
  Uppercase<keyof typeof Role>,
  string
> = {
  AUTHOR: "Autor",
  REVIEWER: "Revisor",
};
