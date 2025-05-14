import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TelegramChat } from "@/components/telegram-chat"

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Chat with Me</h1>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Have questions or want to discuss a project? Chat with me directly through this page. I'll respond as
                soon as possible.
              </p>

              <div className="w-full max-w-2xl mt-8 bg-card border rounded-lg p-6 shadow-sm">
                <div className="text-left mb-6">
                  <h2 className="text-xl font-semibold mb-2">Start a Conversation</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below to start chatting. I typically respond within a few hours during business
                    days.
                  </p>
                </div>

                <div className="h-[400px] border rounded-lg overflow-hidden">
                  {/* This is a placeholder for the embedded chat on this page */}
                  <div className="h-full flex items-center justify-center bg-muted/50">
                    <p>Please use the chat button in the bottom right corner to start a conversation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TelegramChat />
    </div>
  )
}
