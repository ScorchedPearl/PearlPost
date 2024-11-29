import { BackgroundLines } from "@/components/ui/background-lines";

export default function brain(){
  return <>
  <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Pearl Diary, <br /> Multimedia Integration.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      Entries can be private, shared with select people, or made public. You can also add photos and videos to your entries.
      </p>
    </BackgroundLines>
  </>
}