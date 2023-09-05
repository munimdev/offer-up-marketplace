"use client";
import React, { useState, useEffect, useRef } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp,getDocs, query,deleteDoc,
  onSnapshot,doc,updateDoc,orderBy } from "firebase/firestore";
import { db, storage} from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, MoreHorizontal, MoreVertical,ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/router';
const Page = () => {
  const router = useRouter();
  const chatId = router.query.chatId;
  const userId = router.query.userId;
  const [inputValue, setInputValue] = useState<string>();
  // const[chatId,setChatId]=useState<string>(router.query.chatId);
  // const [userId,setUserId] = useState("550e8400-e29b-41d4-a716-446655440000")
  const [isEditId,setIsEditId]=useState<string>();
  const [messages, setMessages] = useState<any[]>([]);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isOptionModaOpen, setIsOptionModalOpen] = useState<string>();
  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };
  const handleIconClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {



    const selectedFile = e.target.files[0];
    const storageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      (error) => {
        //TODO:Handle Error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const message = {
            imageUrl:downloadURL,
            isImage:true,
            isSeen:true,
            isSent:true,
            messages:"",
            senderId: userId,
            time: serverTimestamp(), 
          };
          
          const messagesCollectionRef = collection(db, 'Chats', chatId, 'messages');
          
          const res = await addDoc(messagesCollectionRef, message);
    console.log(res);
    // setInputValue('');
    console.log('Message added successfully!');
        });
      }
    );
    console.log("Selected File:", selectedFile);
  };
  useEffect(() => {
    const messagesCollectionRef = collection(db, 'Chats', chatId, 'messages');
    const q = query(messagesCollectionRef, orderBy('time', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOptionModalOpen(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const deleteChatHandler = async (messageId:string) => {
 
    const messageDocRef = doc(db, 'Chats', chatId, 'messages', messageId);
    try {
      await deleteDoc(messageDocRef);
      console.log('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
    finally {
      setIsOptionModalOpen('');
    }
  }
  const handleSendMessage = async () =>{
const message = {
  imageUrl:"",
  isImage:false,
isSeen:true,
isSent:true,
messages:inputValue,
  senderId: userId,
  time: serverTimestamp(), 
};
setInputValue('')
try {
  if (isEditId) {
    console.log(isEditId,'isEditId')
    const messageDocRef = doc(
      db,
      'Chats',
      chatId,
      'messages',
      isEditId
    );
    await updateDoc(messageDocRef, {
      messages: inputValue,
    });
    setIsEditId(''); // Clear the edit state
    console.log('Message edited successfully!');
  } else {
    const messagesCollectionRef = collection(db, 'Chats', chatId, 'messages');
    const res = await addDoc(messagesCollectionRef, message);
        console.log(res);
        console.log('Message added successfully!');
  }

} catch (error) {
  console.error("Error getting documents: ", error);
}
  }
  return (
    <div className="min-h-[600px] m-5 md:m-10 lg:m-20 border border-gray-300 flex flex-row">
      {/* Sidebar */}
      {/* <div className="flex flex-col border-r border-gray-300"> */}
        {/* Item Display */}
        {/* <div className="p-5 flex flex-col gap-y-5">
          <div className="flex flex-row gap-x-3">
            <Image
              alt="Item Image"
              src="/images/placeholder.png"
              width={80}
              height={50}
              className="rounded"
            />
            <div className="flex flex-col">
              <p>Monitor</p>
              <p>$200</p>
              <p>34 Views</p>
            </div>
          </div>
          <div className="flex flex-row gap-x-5">
            <Button>Mark Sold</Button>
            <Button className="border border-primary bg-white text-primary hover:bg-primary hover:text-white">
              Sell Faster
            </Button>
          </div>
        </div> */}

        {/* Chat List */}
        {/* <div className="border-t border-gray-300 pt-4">
          <p className="px-2 font-semibold text-lg">Messages</p> */}

          {/* Chat Entry */}
          {/* <div className="flex flex-col py-4">
            <div className="p-4 flex flex-row items-center gap-x-10 border border-r-4 -mr-1 border-primary border-r-white z-10">
              <Image
                alt="Item Image"
                src="/images/placeholder.png"
                width={60}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">Wesley Bennet</p>
                <p>You: This is a message</p>
                <p className="text-sm text-gray-600">about 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Sidebar End */}

      {/* Message Window */}
      <div className="flex-1 flex flex-col p-5 border border-primary">
        {/* Window Top Bar */}
        <div className="border-b border-gray-300">
          <div className="p-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-10">
              <Image
                alt="Item Image"
                src="/images/placeholder.png"
                width={60}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-x-2">
                <p className="text-lg font-bold">Wesley Bennet</p>
                <p>Active last day</p>
              </div>
            </div>
            <MoreHorizontal className="text-primary" />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 flex flex-col gap-y-5 justify-end py-4">

          {/* Message Bubble */}
          {userId&&messages&&messages.map((val, ind) => {
    return val.senderId === userId ? (
      <>
    
      <div className="flex flex-row justify-end" key={val.createdAt}>
      {val.isImage&&<div style={{border:"4px solid #D1D5DB",borderRadius:"10px"}}><Image src={val.imageUrl} alt=""  width={180}
              height={150} /></div>}
      {!val.isImage&&  <div className="flex flex-col gap-y-1">
          <p className="text-sm text-gray-600">12:00AM Aug 01</p>
          <div className="flex flex-row gap-x-2">
            <div className="bg-primary text-white w-44 p-3 rounded flex items-center justify-between">
              
              {val.messages} <MoreVertical size={15} className="text-white" onClick={() => setIsOptionModalOpen(val.id)} style={{ cursor: 'pointer' }}/>
            </div>
            {isOptionModaOpen===val.id&&  <div
            ref={modalRef}
                className="bg-white p-3 rounded"
                style={{
                  position: 'absolute',
                  marginTop:"30px",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  right: 50,
                  zIndex: 1000,
                  // top: 0,
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                <button style={{fontSize:"20px",padding:"10px"}} onClick={()=>deleteChatHandler(val.id)}>Delete</button>
                <hr />
                <button style={{fontSize:"20px",padding:"10px"}} onClick={()=>{setIsEditId(val.id);setInputValue(val.messages);setIsOptionModalOpen('');}}>Edit</button>
              </div>}
        
              {val.isSeen&&<div className="self-end p-1 bg-primary rounded-full">
              <CheckCheck size={15} className="text-white" />
            </div>}
          </div>
          {/* <p className="text-end text-sm text-gray-600">Seen</p> */}
        </div>}
      </div>
      </>
    ) : (
      <>
   
      <div className="flex flex-row justify-start" key={val.createdAt}>
      {val.isImage&&<div style={{border:"4px solid #D1D5DB",borderRadius:"10px"}}><Image src={val.imageUrl} alt=""  width={180}
              height={100} /></div> }
      {!val.isImage&&  <div className="flex flex-col gap-y-1">
          <p className="text-sm text-gray-600">12:00AM Aug 01</p>
          <div className="flex flex-row gap-x-2">
            <div className="bg-gray-300 text-black w-44 p-3 rounded">
              {val.messages} 
            </div>
            {val.isSeen&&<div className="self-end p-1 bg-primary rounded-full">
              <CheckCheck size={15} className="text-white" />
            </div>}
          </div>
          {/* <p className="text-end text-sm text-gray-600">Seen</p> */}
        </div>}
      </div>
      </>
    );
  })}

          {/* <div className="flex flex-row justify-end">
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-gray-600">12:00AM Aug 01</p>
              <div className="flex flex-row gap-x-2">
                <div className="bg-primary text-white w-44 p-3 rounded">
                  Sorry it was 200, still interested?
                </div>
                <div className="self-end p-1 bg-primary rounded-full">
                    <CheckCheck size={15} className="text-white"/>
                </div>
              </div>
              <p className="text-end text-sm text-gray-600">Seen</p>
            </div>
          </div>

          <div className="flex flex-row justify-start">
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-gray-600">12:00AM Aug 01</p>
              <div className="flex flex-row gap-x-2">
                <div className="bg-gray-300 text-black w-44 p-3 rounded">
                  Sorry it was 200, still interested?
                </div>
                <div className="self-end p-1 bg-primary rounded-full">
                    <CheckCheck size={15} className="text-white"/>
                </div>
              </div>
              <p className="text-end text-sm text-gray-600">Seen</p>
            </div>
          </div> */}

        </div>

        {/* Message Input */}
        <form className="flex flex-row border-t border-gray-300 p-3 pb-1 items-center">
          <Input
         onChange={handleInputChange}
         value={inputValue}
            className="flex-1 border-none outline-none"
            placeholder="Message..."
          />
           <input
        type="file"
        accept="image/*" // Specify the accepted file types (images in this case)
        style={{ display: "none" }} // Hide the input element
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <ImageIcon
        size={40}
        style={{ cursor: 'pointer' }}
        className="bg-white text-primary mr-2"
        onClick={handleIconClick}
      />
          {/* <ImageIcon size={40} className="bg-white text-primary mr-2"  /> */}
          <Button
            type="button"
            onClick ={handleSendMessage}
            className="border border-primary bg-white text-primary rounded-full"
          >
            Send
          </Button>
        </form>
      </div>
      {/* Message Window End */}
    </div>
  );
};

export default Page;
