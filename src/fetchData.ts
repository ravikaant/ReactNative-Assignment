const controller = new AbortController();
const signal = controller.signal;
export const fetchGifs = ({
  url,
  onSuccess,
}: {
  url: string;
  onSuccess: (data: any[]) => void;
}) => {
  controller.abort;
  fetch(url, {
    signal,
  })
    .then(res => res.json())
    .then(res => {
      onSuccess(res.data);
    })
    .catch(_ => {});
};
