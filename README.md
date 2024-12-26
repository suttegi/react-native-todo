# Task Manager App / Приложение для управления задачами

## Description / Описание

This project is a Task Manager App built using **React Native**. The app allows users to create, view, update, and delete tasks, offering a seamless experience with features like task statuses, detailed task views, and dark mode support. It incorporates a modular design for ease of scalability and maintainability.

Этот проект представляет собой приложение для управления задачами, созданное с использованием **React Native**. Оно позволяет пользователям создавать, просматривать, обновлять и удалять задачи, предоставляя удобный интерфейс с такими функциями, как статусы задач, подробный просмотр задач и поддержка темной темы. Приложение построено на модульной архитектуре, что облегчает масштабирование и сопровождение.

### Key Features / Основные функции
- **Task Management**: Add, view, update, and delete tasks.
- **Управление задачами**: Добавление, просмотр, обновление и удаление задач.

- **Dark Mode Support**: Dynamic styling for light and dark themes.
- **Поддержка темной темы**: Динамическое оформление для светлой и темной тем.

- **Task Status Updates**: Users can set tasks as "In Progress," "Completed," or "Cancelled."
- **Обновление статусов задач**: Пользователи могут установить статусы "В процессе", "Завершено" или "Отменено".

- **Persisted Storage**: Async Storage integration ensures tasks are saved locally between sessions.
- **Сохранение данных**: Интеграция с Async Storage обеспечивает локальное сохранение задач между сеансами.

- **Responsive UI**: Optimized for various screen sizes with smooth interactions.
- **Адаптивный интерфейс**: Оптимизирован для различных размеров экранов с плавным взаимодействием.

---

## Technology Stack / Технологический стек

### Framework / Фреймворк
- **React Native**: Chosen for its cross-platform capabilities, allowing a single codebase to work for both Android and iOS. Its component-based approach simplifies creating dynamic and responsive interfaces.
- **React Native**: Выбран благодаря своей кроссплатформенности, позволяющей использовать единый код как для Android, так и для iOS. Компонентный подход React Native упрощает создание динамичного и отзывчивого интерфейса.

### Libraries / Библиотеки
- **React Context**: Used for state management to handle global app states like dark mode and task list management. This simplifies data sharing across components without prop drilling.
- **React Context**: Используется для управления состоянием приложения, включая управление темной темой и списком задач. Это упрощает обмен данными между компонентами без необходимости передачи пропсов.
- **Lucide-React-Native**: Provides lightweight and customizable icons to enhance the app's UI.
- **Lucide-React-Native**: Обеспечивает легкие и настраиваемые иконки для улучшения интерфейса.
- **React Navigation**: (Optional, if navigation is included) Used for handling navigation between screens, ensuring a smooth and intuitive user experience.
- **React Navigation**: (Опционально, если используется навигация) Применяется для управления навигацией между экранами, обеспечивая плавный и интуитивный пользовательский опыт.

### Storage / Хранилище данных
- **Async Storage**: Used for persistent local storage. This allows users to retain their tasks even after closing the app. The tasks are serialized and stored as JSON strings in Async Storage.
- **Async Storage**: Используется для локального хранилища. Это позволяет сохранять задачи даже после закрытия приложения. Задачи сериализуются и сохраняются в виде JSON-строк в Async Storage.

---

## Architecture and Design Choices / Архитектура и выбор дизайна

### State Management / Управление состоянием
Using **React Context** ensures centralized state management. It allows components to subscribe to state changes and eliminates the need for deeply nested prop passing. This is especially useful for managing global states like dark mode and task data.

Использование **React Context** обеспечивает централизованное управление состоянием. Это позволяет компонентам подписываться на изменения состояния и устраняет необходимость передачи пропсов на глубоких уровнях. Это особенно полезно для управления глобальными состояниями, такими как тема и данные задач.

### Async Storage Integration / Интеграция Async Storage
Tasks and user preferences (e.g., dark mode) are stored using **Async Storage**. This approach ensures:
- **Persistence**: Data is retained even when the app is closed.
- **Сохранение данных**: Информация сохраняется даже при закрытии приложения.
- **Efficiency**: Only updated data is serialized and saved.
- **Эффективность**: Сохраняются только обновленные данные.

### Styling / Стилизация
Dynamic styling is implemented to support both light and dark themes. The `getTaskDetailStyles` function dynamically returns style objects based on the current theme.

Реализована динамическая стилизация для поддержки светлой и темной тем. Функция `getTaskDetailStyles` динамически возвращает объекты стилей в зависимости от текущей темы.

---

## Installation / Установка

1. Clone the repository:
   ```bash
   git clone https://github.com/suttegi/react-native-todo
   cd rect-native-todo
   ```

   Склонируйте репозиторий:
   ```bash
   git clone https://github.com/suttegi/react-native-todo
   cd rect-native-todo
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

   Установите зависимости:
   ```bash
   npm i
   ```

3. Start the app:
   ```bash
   npm run android # For Android
   npm run ios     # For iOS
   ```

   Запустите приложение:
   ```bash
   npm run android # Для Android
   npm run ios     # Для iOS
   ```

---

## Usage / Использование

1. **Adding Tasks**: Click the "+" button to add a new task with title, description, and status.
   
   **Добавление задач**: Нажмите на кнопку "+", чтобы добавить новую задачу с названием, описанием и статусом.

2. **Updating Task Status**: Open a task and select one of the statuses ("In Progress," "Completed," or "Cancelled"). The selected status will be highlighted in blue.

   **Обновление статуса задачи**: Откройте задачу и выберите один из статусов ("В процессе", "Завершено" или "Отменено"). Выбранный статус будет выделен синим цветом.

3. **Dark Mode**: Toggle the system theme, and the app will automatically adjust to light or dark mode.

   **Темная тема**: Переключите системную тему, и приложение автоматически адаптируется к светлой или темной теме.

---

## Future Improvements / Будущие улучшения

1. **Cloud Sync**: Integrate cloud storage for cross-device task synchronization.
   
   **Синхронизация с облаком**: Интеграция облачного хранилища для синхронизации задач между устройствами.

2. **Push Notifications**: Notify users about upcoming deadlines or pending tasks.
   
   **Уведомления**: Оповещения пользователей о предстоящих сроках или невыполненных задачах.

3. **Enhanced UI/UX**: Add animations and transitions for better user experience.
   
   **Улучшение UI/UX**: Добавление анимаций и переходов для улучшения пользовательского опыта.

---

## Contributing / Вклад в проект

Feel free to fork the repository and submit pull requests for new features or bug fixes. All contributions are welcome!

Вы можете форкнуть репозиторий и отправить pull request для добавления новых функций или исправления ошибок. Все предложения приветствуются!

---

## License / Лицензия

This project is licensed under the MIT License. See the LICENSE file for details.

Этот проект распространяется под лицензией MIT License. Подробнее см. в файле LICENSE.

---

### Acknowledgments / Благодарности

Special thanks to the open-source community and contributors of React Native, Lucide-React-Native, and Async Storage for their incredible tools and support.

Особая благодарность сообществу open-source и разработчикам React Native, Lucide-React-Native и Async Storage за их невероятные инструменты и поддержку.

