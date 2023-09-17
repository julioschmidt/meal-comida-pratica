import Navigation from "../components/Navigation";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="bg-white h-screen">
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="h-full bg-white pr-10">
          <div className="bg-white h-screen flex flex-col justify-center pl-4">
            <div className="pb-3">
              <h1 className="text-slate-600 text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
                Bem vindo ao Meal
              </h1>
              <p className="text-slate-600 text-base ">
                Entre ou
                <Navigation
                  className="text-green-500 text-base font-semibold underline"
                  route={"#"}
                  text={" crie sua conta"}
                />
              </p>
            </div>
            <div className="text-slate-600 mb-3">
              <form>
                <div className="flex flex-col leading-tight pb-5">
                  <label className="text-sm pb-1.5" htmlFor="email">
                    Email
                  </label>
                  <div className="leading-tight w-80 self-stretch h-12 p-3 bg-white rounded-md border border-slate-600 justify-start items-start gap-3 inline-flex">
                    <input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col pb-5">
                  <label className="text-sm pb-1.5" htmlFor="password">
                    Senha
                  </label>
                  <div className="leading-tight w-80 self-stretch h-12 p-3 bg-white rounded-md border border-slate-600 justify-start items-start gap-3 inline-flex">
                    <input type="password" id="password" />
                  </div>
                </div>
                <div className="w-80 h-12 px-4 py-3 bg-green-500 rounded-md justify-center items-center gap-2.5 inline-flex">
                  <button
                    className="text-white text-base font-semibold font"
                    type="submit"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
            <Navigation
              className="text-slate-700 font-semibold underline leading-snug"
              route={"#"}
              text={"Esqueci a senha"}
            />
          </div>
        </div>
        <div className="hidden h-screen flex-grow md:flex items-center justify-end bg-green-500">
          <div className="text-white p-6">
            <h2 className="text-3xl md:text-2xl font-bold">
              Descubra Novas Receitas!
            </h2>
            <p className="text-lg lg:text-lg md:text-sm mt-4">
              Explore uma variedade de receitas deliciosas para tornar suas
              refeições ainda mais especiais. Junte-se à comunidade Meal hoje
              mesmo e comece a descobrir novos sabores.
            </p>
          </div>
          <Image
            src={"/images/cozinheira.svg"}
            alt={""}
            width={500}
            height={500}
            className="hidden md:block lg:block md:w-[250px] lg:w-[350px] xl:w-[450px]"
          />
        </div>
      </div>
    </div>
  );
}
