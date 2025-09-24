import EventAnnouncement from "@/components/EventAnnouncement"

export default function EventDemoPage() {
  const handleJoin = () => {
    console.log("Join button clicked")
    // Add your join logic here
  }

  const handleShare = () => {
    console.log("Share button clicked")
    // Add your share logic here
  }

  return (
    <div className='min-h-screen'>
      <EventAnnouncement onJoin={handleJoin} onShare={handleShare} />
    </div>
  )
}
