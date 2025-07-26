export type Photo = {
  uid: string;
  url: string;
  caption: string;
  author: string;
  timestamp: Date;
};
export type GuestMessage = {
  uid?: string;
  name: string;
  message: string;
  timestamp: Date;
};

export type Post = {
  id: string;
  uid: string;
  url: string;
  caption: string;
  author: string;
  timestamp: Date | string;
};
