"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Profile() {
  const avatarUrl = "https://avatars.githubusercontent.com/u/108667536?v=4"

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={avatarUrl} alt="Photo de profil" />
        <AvatarFallback>VP</AvatarFallback>
      </Avatar>
      <div>Alex Traveylan</div>
    </div>
  )
}

export default Profile
