# Open Source - Context Menu - alt:V

Created by Stuyk (Trevor Wessel)

❤️ Please support my open source work by donating. I'm here to provide general context for complicated procedures for you new developers. ❤️

https://github.com/sponsors/Stuyk/

⭐ This repository if you found it useful!

---

![](https://i.imgur.com/srGHPbB.jpeg)

# Description

This allows you to create a simple context menu for players to utilize. Which means they can hold `left alt` and `right-click` on objects to select different objects. Which is great for creating in-depth options for players to utilize.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

After simply add the name of this resource to your `server.cfg` resource section.

`altv-os-context-menu`

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/Stuyk/altv-os-context-menu
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

# Configuring A Menu

All menus must be created on **client-side**.
They only need to be initialized once.
They are attached to an identifier and an entity id.

`alt.emit('context:CreateMenu')`

| Argument        | Description                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `identifier`    | The name to identify this interaction with. Must be unique. Unless using `isModel`                                          |
| `entityOrModel` | The entity or model. If using model. Ensure to set `isModel` to true. This will work for all models across the map.         |
| `title`         | The name of the menu.                                                                                                       |
| `isModel`       | If you used a `model #` instead of an `entity #` you must specify true. Globally applies menu to all models across the map. |

### Example

```js
alt.on('context:Ready', () => {
    alt.emit('context:CreateMenu', 'trashcan1', 49666, 'Trash Can');
});
```

# Appending to Menu

All menus have an identifier.
Use the identifier to apply options to a menu.

`alt.emit('context:CreateMenu')`

identifier, menuName, callbackName, isServer = false

| Argument       | Description                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `identifier`   | The name to identify this interaction with. Must be unique.                                   |
| `menuName`     | The name of the option.                                                                       |
| `callbackName` | The event to call when the option is selected. Comes through `alt.emit` or `alt.onClient`     |
| `isServer`     | If true. Then the `callbackName` event will come through `alt.onClient`. Otherwise `alt.emit` |

### Example

```js
alt.on('context:Ready', () => {
    alt.emit('context:CreateMenu', 'trashcan1', 49666, 'Trash Can');
    alt.emit('context:AppendToMenu', 'trashcan1', 'Look in Trash', 'trashcan:Look', false);
    alt.emit('context:AppendToMenu', 'trashcan1', 'Dig in Trash', 'trashcan:Dig', true);
});
```

### Example - Recieving the Event on Client-side.

```js
alt.on('trashcan:Look', data => {
    alt.log(JSON.stringify(data));
});
```

### Example - Recieving the Event on Server-side.

```js
alt.onClient('trashcan:Dig', (player, data) => {
    console.log(data);
    alt.log(`${player.name} has dug in the trash. What an animal!`);
});
```

# Other alt:V Open Source Resources

-   [Authentication by Stuyk](https://github.com/Stuyk/altv-os-auth)
-   [Discord Authentication by Stuyk](https://github.com/Stuyk/altv-discord-auth)
-   [Global Blip Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-blip-manager)
-   [Global Marker Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-marker-manager)
-   [Chat by Dzeknjak](https://github.com/jovanivanovic/altv-os-chat)
-   [Entity Sync for JS by LeonMrBonnie](https://github.com/LeonMrBonnie/altv-os-js-entitysync)
