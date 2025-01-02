import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const avatars = [
  {
    id: 1,
    name: "The Farmer",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE14EsW1uTtabJtchrCcnr7kEBTdPyDqUSoA&s",
    requiredLevel: 1,
  },
  {
    id: 2,
    name: "The Boss",
    url: "https://avatars.githubusercontent.com/u/124599?v=4",
    requiredLevel: 2,
  },
  {
    id: 3,
    name: "The Astronaut",
    url: "https://avatarfiles.alphacoders.com/371/371359.png",
    requiredLevel: 3,
  },
  {
    id: 4,
    name: "The Trader",
    url: "https://avatarfiles.alphacoders.com/372/372948.png",
    requiredLevel: 4,
  },
  {
    id: 5,
    name: "Flowers",
    url: "https://avatarfiles.alphacoders.com/369/369952.png",
    requiredLevel: 5,
  },
  {
    id: 6,
    name: "Telescope",
    url: "https://avatarfiles.alphacoders.com/371/371441.png",
    requiredLevel: 6,
  },
  {
    id: 7,
    name: "Whale",
    url: "https://avatarfiles.alphacoders.com/370/370241.png",
    requiredLevel: 7,
  },
  {
    id: 8,
    name: "Cave",
    url: "https://avatarfiles.alphacoders.com/370/370205.png",
    requiredLevel: 8,
  },
  {
    id: 9,
    name: "Coffee",
    url: "https://avatarfiles.alphacoders.com/370/370240.png",
    requiredLevel: 9,
  },
  {
    id: 10,
    name: "Cake",
    url: "https://avatarfiles.alphacoders.com/370/370775.png",
    requiredLevel: 10,
  },
  {
    id: 11,
    name: "Ring",
    url: "https://avatarfiles.alphacoders.com/374/374052.png",
    requiredLevel: 11,
  },
];

export const ForumPopup = ({ product, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[850px]">
        {product && (
          <>
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-6 space-y-6">
              <div className="flex space-x-4">
                <Avatar>
                  <AvatarImage src={avatars[0].url} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {product.user}
                    <span className="pl-1 text-muted-foreground">
                      {product.createdAt} · Posted in {product.price}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.name}
                  </p>
                  <p className="text-sm">{product.body}</p>
                </div>
              </div>

              {product.replies.map((reply, index) => (
                <div key={index} className="pl-4 flex space-x-4">
                  <Avatar>
                    <AvatarImage src={avatars[2].url} />
                    <AvatarFallback>J2</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {reply.author}
                      <span className="pl-1 text-muted-foreground">
                        {reply.date}
                      </span>
                    </p>
                    <p className="text-sm">{reply.content}</p>
                  </div>
                </div>
              ))}

              <div className="flex space-x-4">
                <Avatar>
                  <AvatarImage src={avatars[3].url} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write your reply..."
                    className="text-sm"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="secondary"
                      className="rounded-md px-4 py-2 text-sm font-medium"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
