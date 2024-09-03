let male = [];
for (let i = 1; i <= 31; i++) {
  male.push({
    name: "male",
    path: `/image/avatar/boy/b${i}.png`,
  });
}

let female = [];
for (let i = 1; i <= 31; i++) {
  female.push({
    name: "female",
    path: `/image/avatar/girl/g${i}.png`,
  });
}

export { male, female };
