declare type StackNavigation = {
  Home: undefined;
  Forums: undefined;
  ChatRoom: { forumName: string } | undefined;
};

declare type ForumData = {
  forumName: string;
  description: string;
  iconName: string;
};
