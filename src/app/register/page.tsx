"use client";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Navigation from "../components/Navigation";
import Image from "next/image";
import { set } from "date-fns";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [addressEditable, setAddrressEditable] = useState<boolean>(false);
  const [cepError, setCepError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  function formatCEP(input: HTMLInputElement) {
    input.value = input.value.replace(/\D/g, "");

    if (input.value.length > 5) {
      input.value = input.value.slice(0, 5) + "-" + input.value.slice(5, 8);
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError == "") {
      const user = {
        email,
        cep,
        password,
      };
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        window.open("/login", "_self");
        console.log("ok"); //verificar algo para renderizar para usuario
      } else {
        console.log("not ok"); //verificar algo para renderizar para usuario
      }
    }
  };

  useEffect(() => {
    const fetchAddressData = async () => {
      if (cep.length === 9) {
        setAddrressEditable(false);
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
          );

          if (response.ok) {
            const data = await response.json();
            setCepError("");
            if (!data.logradouro) {
              setAddress("")
              setAddrressEditable(true);
              setCity(data.localidade);
              setDistrict(data.uf)
            } else {
              setAddress(data.logradouro);
              setCity(data.localidade);
              setDistrict(data.uf);
            }
          } else {
            setCepError("CEP não encontrado");
          }
        } catch (error) {
          console.error("Error fetching address data:", error);
        }
      } else {
        setAddress("");
        setCity("");
        setDistrict("");
      }
    };

    fetchAddressData();
  }, [cep]);

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordError("");
    } else {
      setPasswordError("As senhas não coincidem");
    }
  }, [password, confirmPassword]);

  return (
    <div className="bg-white h-screen">
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="flex justify-center items-center h-full bg-white pr-10 ">
          <div className="bg-white h-screen flex flex-col justify-center pl-4">
            <div className="pb-3">
              <h1 className="text-slate-600 text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold pb-2">
                Crie sua conta no Meal
              </h1>
              <p className="text-slate-600 text-base ">
                Crie sua conta ou
                <Navigation
                  className="text-green-500 text-base font-semibold underline"
                  route={"/login"}
                  text={" entre"}
                />
              </p>
            </div>
            <div className="text-slate-600 mb-3">
              <div className="flex flex-col">
                <form onSubmit={handleFormSubmit}>
                  <div className="pb-5">
                    <Input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      inputClassName="w-80 h-10 p-3 bg-white rounded-md border border-slate-600"
                    />
                  </div>
                  {/* <div className="pb-5">
                    <DateInput
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                      label="Data de nascimento"
                      placeholderText="DD / MM / AAAA"
                      inputClassName="flex-center w-80 h-10 py-1 px-2 bg-white rounded-md border border-slate-600"
                    />
                  </div> */}
                  <div className="pb-5">
                    <Input
                      type="text"
                      id="cep"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      placeholder="95900-000"
                      label="Cep"
                      max-length="9"
                      onInput={(e) => formatCEP(e.target as HTMLInputElement)}
                      inputClassName="w-80 h-10 p-3 bg-white rounded-md border border-slate-600"
                    />
                  </div>
                  {cepError && <p className="text-red-500">{cepError}</p>}
                  <div className="pb-5">
                    <Input
                      type="text"
                      id="address"
                      readOnly={!addressEditable}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, bairro"
                      label="Endereço"
                      inputClassName={`${addressEditable ? "bg-white" : "bg-slate-200"
                        }
                        w-80 h-10 p-3 rounded-md border border-slate-600`}
                    />
                  </div>
                  <div className="flex space-x-4 pb-5">
                    <Input
                      type="text"
                      id="city"
                      readOnly={true}
                      placeholder="Porto Alegre"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      label="Cidade"
                      inputClassName="w-60 h-10 p-3 bg-slate-200 rounded-md border border-slate-600"
                    />

                    <Input
                      type="text"
                      readOnly={true}
                      id="district"
                      placeholder="RS"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      label="Estado"
                      inputClassName="w-16 h-10 p-3 bg-slate-200 rounded-md border border-slate-600"
                    />
                  </div>
                  <div className="pb-5">
                    <Input
                      type="password"
                      id="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label="Senha"
                      inputClassName="w-80 h-10 p-3 bg-white rounded-md border border-slate-600"
                    />
                  </div>
                  <div className="pb-3">
                    <Input
                      type="password"
                      id="confirm_password"
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      label="Confirmar senha"
                      inputClassName="w-80 h-10 p-3 bg-white rounded-md border border-slate-600"
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}
                  <div className="w-80 h-10 flex-col justify-center items-center gap-2.5 inline-flex mt-10">
                    <Button
                      type="submit"
                      text="Cadastrar"
                      className="text-white text-base font-semibold bg-green-500 rounded-md px-28 py-3 "
                    />
                    <Navigation
                      className="text-slate-700 font-semibold underline leading-snug"
                      route={"#"}
                      text={"Esqueci a senha"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden h-screen md:flex items-center justify-end bg-green-500 w-3/4">
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
