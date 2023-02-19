const handleError = ({ error }) => {
  return {
    //@ts-expect-error -- checks if message exists on error
    message: error?.message ?? "Oops, we ran into an issue!",
    //@ts-expect-error -- checks if code exists on error
    code: error?.code ?? "UNKNOWN",
    //@ts-expect-error -- checks if status exists on error
    status: error?.status ?? 500
  };
};
export {
  handleError
};
