import ModalChoicePlaces from "@/components/ModalChoicePlaces";
import { getCountries } from "@/services/api";

export default async function Home() {
  const data = await getCountries();

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gradient-to-r from-blue-500 to-transparent">
      <div className="max-w-3xl px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-primary-foreground sm:text-5xl">
          For Country, State, and City Selection
        </h1>
        <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
          Discover New Horizons Learn about the landmarks, news, and fun facts
          of the cities you choose.
        </p>
        <div className="mt-8">
          <ModalChoicePlaces data={data}></ModalChoicePlaces>
        </div>
      </div>
    </div>
  );
}
