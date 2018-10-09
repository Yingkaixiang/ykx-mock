export default (Mock) => {
  return {
    'GET /login': () => {
      return { name: Mock.mock('@cname') };
    },
  };
};
