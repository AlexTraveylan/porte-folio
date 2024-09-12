"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Profile() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage
          src={"/profil.webp"}
          alt="Photo de profil"
          width={40}
          height={40}
        />
        <AvatarFallback>VP</AvatarFallback>
      </Avatar>
      <div>Alex Traveylan</div>
    </div>
  )
}

export default Profile
