## Описание

Этот гит-репо позволяет получать ежечасно получать данные с АПИ wb, скапливать их в БД и раз в день сохранять последнее спаршеное значение в проивзольное количество Google sheets.
Скрипт складирует данные в таблице tariffs, одна строка - один день. Строки обновляются до момента, пока не наступят следующие сутки(00:00).
Скрипт отправляет данные в google таблицы id которых указан в .env раз в сутки в 23:59 МСК.
Проект работает внутри docker на node js с postgresql и knex js как ORM.

## Быстрый старт

Для работы скрипта нам нужно подготовить:

- Google аккаунт
- Google cloud проект
- Google service аккаунт

### Подготовка google Cloud аккаунта

1. Если нет аккаунта google, идем на google.com и регистрируем его.
2. Далее, переходим на [google cloud](https://console.cloud.google.com/cloud-resource-manager), создаем новый проект ("Create project").
3. После, нам нужно включить АПИ [sheets](https://console.cloud.google.com/apis/library/sheets.googleapis.com) и [drive](https://console.cloud.google.com/apis/library/drive.googleapis.com) ("Enable").
4. Далее, идем в [Credentials](https://console.cloud.google.com/apis/credentials), создаем Service Account ("Create credentials" -> "Service account"), в Permissions выбираем роль "Basic" -> "Editor".
5. Нажимаем на строку с новым service аккаунтом, сверху выбираем "Keys", нажимаем "Add key" -> "Create new key" -> "JSON". Вам на устройство скачается .json ключ, он будет использоваться далее.

### Подготовка google таблиц

1. Созданый service аккаунт нужно добавить **во все** гугл таблицы в качестве редактора.
2. Страница, на которую будут отгружаться все данные, должна называться `stocks_coefs`.
   **БЕЗ ЭТИХ ДВУХ ДЕЙСТВИЙ СКРИПТ РАБОТАТЬ НЕ БУДЕТ!** .

### Копирование репозитория и подготовка зависимостей

Клонируем гит репу:

```bash
git clone https://github.com/B1java/wb_tt.git
```

#### Установка на Linux Ubuntu

Устанавливаем docker:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Устанавливаем docker compose:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Устанавливаем npm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Переходим в рабочую директорию, устанавливаем зависимости и копируем `.env`:

```bash
cd wb_tt
npm i
cp example.env .env
```

#### Установка на Windows

Клонируем гит репу:

```bash
git clone https://github.com/B1java/wb_tt.git
```

Скачиваем и устанавливаем [Docker Desktop](https://www.docker.com/products/docker-desktop/) и [npm](https://nodejs.org/en/download).

Заходим в POWERSHELL в директорию проекта, устанавливаем зависимости:

```bash
cd wb_tt
npm i
```

Копируем `.env`

```bash
Copy-Item -Path "example.env" -Destination ".env"
```

## Запуск скрипта

Вписываем в `.env` свои значения `WB_APIKEY` и `GOOGLE_SHEETS_IDS`. Таблицы вписываются в формате `table-id_1,table-id_2` - через `,` без пробелов.

В папку `keys` вставляем полученый ранее ключ и переименовываем его в `googleKey.json`.

Запускаем скрипт

```bash
docker compose up -d --build
```

## Полезные команды

Посмотреть логи

```bash
docker compose logs
```

Остановить контейнеры

```bash
docker compose down
```

Остановить контейнеры и удалить все данные из хранилищ:

```bash
docker compose down -v
```
