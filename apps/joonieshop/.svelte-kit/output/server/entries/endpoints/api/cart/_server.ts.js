const PATCH = async ({ request }) => {
  return new Response(JSON.stringify({ data: "hey" }));
};
export {
  PATCH
};
