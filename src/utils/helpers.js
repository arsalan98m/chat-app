export function getNameInitials(name) {
  console.log(name);
  const splitName = name.toUpperCase().split(" ");

  if (splitName.length > 1) {
    console.log(splitName[0][0] + splitName[1][0]);
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];
}
