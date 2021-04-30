const str = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDom = parser.parseFromString(str, "text/xml");

console.log(xmlDom);
const listNode = xmlDom.querySelector("list");
const stuNode = listNode.querySelectorAll("student");

let resultArr = [];

for (let i of stuNode) {
  const fNameNode = i.querySelector("first");
  const sNameNode = i.querySelector("second");
  const ageNode = i.querySelector("age");
  const profNode = i.querySelector("prof");
  const nameNode = i.querySelector("name");
  const langAttr = nameNode.getAttribute("lang");

  const result = {
    name: fNameNode.textContent + " " + sNameNode.textContent,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr,
  };

  resultArr.push(result);
}
let resultObj = {
  list: resultArr,
};
console.log(resultObj);
/*
{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}*/
