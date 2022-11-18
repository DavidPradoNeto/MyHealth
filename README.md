# MyHealth
Codigos desenvolvidos durante a disciplina Programação Móvel no curso de Analise e Desenvolvimento de Sistemas

Aplicativo desenvolvido com React-Native, baseado no modelo que o professor passou via Figma
* [Protótipo](https://www.figma.com/file/dg4NfC6ha9XdOzaBTrYWIh/MyHealth-mobile-(Copy))



#
Requisitos: 

1. Java 1.8

2. Android Studio
   - Marcar a instalação do Android Virtual Device
   - No Android Studio, acessar More Options... -> SDK MANAGER -> Instalar Android 12 (S) API Level 31
   - No Android Studio, acessar More Options... -> Virtual Device Manager -> Selecionar aparelho Pixel 2 -> Fazer Download do Android S (Api Level 31)
   
3. Node JS 16.X LTS
   - Prestar atenção se a opção ADD TO PATH está marcada
   
4. Adicionar à variável PATH os seguintes diretórios:
   - C:\Users\<nome_do_usuário>\AppData\Local\Android\Sdk\build-tools
   - C:\Users\<nome_do_usuário>\AppData\Local\Android\Sdk\emulator
   - C:\Users\<nome_do_usuário>\AppData\Local\Android\Sdk\platform-tools
   
5. Criar a variável de ambiente ANDROID_SDK_ROOT com o valor:
   - C:\Users\<nome_do_usuário>\AppData\Local\Android\Sdk


#

Para Rodar:

```sh
git clone https://github.com/DavidPradoNeto/MyHealth
cd ./MyHealth
npm install
npm run android
```
