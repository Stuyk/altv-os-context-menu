/// <reference types="@altv/types-client" />
import alt from 'alt';

const url = 'http://resource/client/html/index.html';
const menus = {};
const entities = {};
const models = {};

let view;
let data;

alt.on('context:Dismount', handleDismount);
alt.on('context:ParseInteraction', handleInteraction);
alt.on('context:CreateMenu', handleCreateMenu);
alt.on('context:AppendToMenu', handleAppendToMenu);

if (!view) {
    view = new alt.WebView(url);
    view.on('context:Select', handleSelect);
}

function handleInteraction(type, entity, model, coords) {
    alt.log(`[CONTEXT-INFO] Type: ${type} | ID: ${entity} | Model: ${model} | Coords: ${JSON.stringify(coords)}`);

    data = {
        type,
        entity,
        model,
        coords
    };

    if (models[model]) {
        view.focus();
        showCursor(true);
        const cursor = alt.getCursorPos();
        view.emit('context:Mount', menus[model], cursor.x, cursor.y);
        return;
    }

    if (menus[entity]) {
        view.focus();
        showCursor(true);
        const cursor = alt.getCursorPos();
        view.emit('context:Mount', menus[entity], cursor.x, cursor.y);
    }
}

function handleCreateMenu(identifier, entityOrModel, title, isModel = false) {
    if (menus[entityOrModel]) {
        alt.log(`[CONTEXT-ERROR] Identifier ${identifier} is already in use for entity/model ${entityOrModel}.`);
        return;
    }

    let invalidIdentifier = false;
    Object.keys(menus).forEach(key => {
        if (invalidIdentifier) {
            return;
        }

        if (menus[key] && menus[key].identifier === identifier) {
            invalidIdentifier = true;
            return;
        }
    });

    if (invalidIdentifier) {
        alt.log(`[CONTEXT-ERROR] Identifier ${identifier} is already in use for entity/model ${entityOrModel}.`);
        return;
    }

    alt.log(`[CONTEXT-SUCCESS] Identifier ${identifier} is bound to ${entityOrModel}. Title: ${title}`);
    menus[entityOrModel] = {
        title,
        identifier,
        options: [],
        isModel
    };

    if (isModel) {
        models[identifier] = model;
        return;
    }

    entities[identifier] = entityOrModel;
}

function handleAppendToMenu(identifier, menuName, callbackName, isServer = false) {
    const entity = entities[identifier];

    if (!entity) {
        alt.log(`[CONTEXT-ERROR] Identifier ${identifier} not found.`);
        return;
    }

    menus[entity].options.push({ name: menuName, eventName: callbackName, isServer });
}

function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) {
        return;
    }
}

function handleDismount() {
    if (!view) {
        return;
    }

    view.emit('context:Dismount');
    view.unfocus();
    showCursor(false);
}

function handleSelect(eventName, isServer) {
    handleDismount();
    if (isServer) {
        alt.emitServer(eventName, data);
        return;
    }

    alt.emit(eventName, data);
}

alt.emit('context:Ready');
