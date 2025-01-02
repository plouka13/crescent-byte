"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForumPopup } from "./ForumPopup";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

const products = [
  {
    name: "Disable adding new stock for users?",
    body: "Is there a way to disable adding new stocks for users? Instead let them choose from a dropdown of stocks?",
    url: avatars[0].url,
    user: "Sabrina Carlyhead",
    status: "Open",
    price: "Support",
    totalSales: 3,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great idea, would be so helpful!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it! Admins!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Implement two-factor authentication",
    body: "We need to enhance security by implementing two-factor authentication for user logins.",
    url: avatars[1].url,
    user: "Emily Grey",
    status: "Open",
    price: "Support",
    totalSales: 4,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Improve mobile responsiveness",
    body: "The website needs to be optimized for better responsiveness on mobile devices.",
    url: avatars[2].url,
    user: "Super Duper",
    status: "Open",
    price: "Support",
    totalSales: 1,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Integrate with payment gateway",
    body: "We need to integrate with a popular payment gateway to accept online payments.",
    url: avatars[3].url,
    user: "Just run please",
    status: "Open",
    price: "Support",
    totalSales: 2,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Improve search functionality",
    body: "The search functionality needs to be enhanced for better user experience.",
    url: avatars[4].url,
    user: "John Doe",
    status: "Open",
    price: "Support",
    totalSales: 8,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Implement user activity tracking",
    body: "We need to track user activities for better analytics and personalization.",
    url: avatars[5].url,
    user: "John Wick",
    status: "Open",
    price: "Support",
    totalSales: 5,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Add social media integration",
    body: "Users should be able to share content from our website on popular social media platforms.",
    url: avatars[6].url,
    user: "Peter Gryphin",
    status: "Open",
    price: "Support",
    totalSales: 7,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Implement chatbot for customer support",
    body: "We need to implement a chatbot for providing better customer support.",
    url: avatars[7].url,
    user: "Jump King",
    status: "Open",
    price: "Support",
    totalSales: 10,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Improve website performance",
    body: "The website needs to be optimized for better performance and faster loading times.",
    url: avatars[8].url,
    user: "Jacky Chan",
    status: "Open",
    price: "Support",
    totalSales: 1,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
  {
    name: "Implement multi-language support",
    body: "We need to add support for multiple languages to cater to a global audience.",
    url: avatars[9].url,
    user: "Homeless Man",
    status: "Open",
    price: "Support",
    totalSales: 2,
    createdAt: "2023-07-12 10:42 AM",
    replies: [
      {
        content: "This is a great product!",
        author: "John Doe",
        date: "2023-07-13",
      },
      {
        content: "I love it!",
        author: "Jane Smith",
        date: "2023-07-14",
      },
    ],
  },
];

export const ForumMain = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
      <Tabs defaultValue="all" className="pt-4">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    New Post
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Post</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new post
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter post description"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium leading-6"
                    >
                      Type
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Enter post type"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium leading-6"
                    >
                      Status
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="status"
                        id="status"
                        placeholder="Enter post status"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Forum posts</CardTitle>
              <CardDescription>
                Connect to traders all across the world!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden md:table-cell">
                      Posted By
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Catagory
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Replies
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleProductClick(product)}
                    >
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex flex-row gap-2">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={product.url} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <CardDescription className="text-sm pt-3">
                            {product.user}
                          </CardDescription>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className=""
                          variant={
                            product.status === "Draft" ? "secondary" : "outline"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.price}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.totalSales}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
          <ForumPopup
            product={selectedProduct}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
