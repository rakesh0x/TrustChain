"use client";

import { useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { useToast } from "./use-toast";
import trustchain from "../../contracts/trustchain.json"


interface UploadModalProps {
  onUpload: (file: File) => Promise<void>; // Modified to return a Promise
  uploading: boolean;
}

export function UploadModal({ onUpload, uploading }: UploadModalProps) {
  const [file, setFile] = useState<File | undefined>();
  const [open, setOpen] = useState(false); // State to control dialog open/close
  const { toast } = useToast();

  const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        await onUpload(file);
        toast({
          title: "Document Uploaded!",
          description: "Your document has been successfully uploaded to the blockchain.",
          variant: "success",
        });
        setOpen(false); // Close the dialog on success
        setFile(undefined); // Clear the selected file
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "There was an error uploading your document.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Aadhar Secure QR Code</CardTitle>
            <CardDescription>
              Anon Aadhaar allows you to create a proof of your Aadhaar ID without revealing any personal data. This process is local to your browser for privacy, and QR images are not uploaded to any server.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="picture" type="file" onChange={handleFileChange} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setFile(undefined)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!file || uploading}>
              {uploading ? "Uploading..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
