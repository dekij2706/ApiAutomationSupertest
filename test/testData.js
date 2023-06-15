const addNewValueBody = {
  main_key: "AAATestKey1",
  value: "AAATestValue1",
};

const deleteValueBody = {
  main_key: "AAATestKey1",
};

const nonExistingValueBody = {
  value: "NonExistentValue",
  main_key: "NonExistentKey",
};

const postValueNotExistBody = {
  main_key: "AAATestKey1",
  value: "AAATestValue2",
};
const postValuetExistBody = {
  main_key: "Ocicat",
  value: "Kellie Lind Updated",
};
const XMLBody = "<value>AAATestValue1</value><main_key>AAATestKey1</main_key>";

const xmlHeader = { "Content-Type": "application/xml" };

module.exports = {
  addNewValueBody,
  deleteValueBody,
  nonExistingValueBody,
  postValueNotExistBody,
  postValuetExistBody,
  XMLBody,
  xmlHeader,
};
