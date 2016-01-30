// This is the actual config file, written in JavaScript. It is in this file you
// add custom commands and set options, or whatever you'd like to do.

let {commands} = vimfx.modes.normal;
vimfx.addCommand({
  name: 'search_tabs',
  description: 'Search tabs',
  category: 'tabs',
  order: commands.focus_location_bar.order + 1
}, (args) => {
  commands.focus_location_bar.run(args);
  args.vim.window.gURLBar.value = '% ';
});

let map = (shortcuts, command, custom=false) => {
  vimfx.set(`${custom ? 'custom.' : ''}mode.normal.${command}`, shortcuts);
};


map('T',  'search_tabs', true);
