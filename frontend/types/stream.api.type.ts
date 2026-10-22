export interface StreamEventResponse {
  id: number;
  room: { room_id: number; name: string; title: string };
  plans: number[];
  title: string;
  description: string;
  starting_time: string;
  duration: string;
}

export interface StreamLinkResponse {
  id: number;
  link: string;
}
