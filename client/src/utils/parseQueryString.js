export default queryString =>
  JSON.parse(
    '{"' +
      decodeURI(queryString.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
