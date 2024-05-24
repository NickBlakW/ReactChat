declare type StackNavigation = {
  Home: undefined;
  Forums: undefined;
  ChatRoom: { forumName: string } | undefined;
};

declare type ForumData = {
  id: string;
  forumName: string;
};
