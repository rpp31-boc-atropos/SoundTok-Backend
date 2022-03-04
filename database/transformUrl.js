const tranformUrl = (url) => {
  const splitUrl1 = url.indexOf('upload/');
  const splitUrl2 = url.indexOf('/v');
  const firstChunk = url.substring(0, splitUrl1 + 7);
  const middleChunk = 'h_96,w_96';
  const endChunk = url.substring(splitUrl2);
  return firstChunk + middleChunk + endChunk;
};

module.exports = tranformUrl;

