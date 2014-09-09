define(['Snap', 'color-utils'],
function(Snap,   Color) {
	return Snap.plugin(function(Snap, Element, Paper) {
		var PADDING = 0.05;
		var COLUMNS = 3;
		var ROWSPACING = 8;
		var KEY_TEXT_SPACING = 1.5;
		var NEUTRAL_FILL = '#E4E4E3';
		var NEUTRAL_STROKE = '#676A68';
		var MAX_TEXT_LENGTH = 9;

		Paper.prototype.key = function(x, y, width, data) {

			var colorClasses = Color.harmonious(data.length);

			var container = this.rect(x, y, width, 0)
				.addClass('fm-key-container')
				.attr({
					fill: NEUTRAL_FILL,
					stroke: NEUTRAL_STROKE
				});

			var items = this.g();

			var columnOffset = 0;
			var rowOffset = 0;

			function showFullText() {

			}

			function hideFullText() {

			}

			for (var i = 0; i < data.length; i++) {
				var keyColor;
				
				if(i !== 0 && i % COLUMNS === 0) {
					columnOffset = 0;
					rowOffset += title.getBBox().height + ROWSPACING;
				}

				if (data[i].hasOwnProperty('overflow')) {
					keyColor = Color.overflowClass;
				} else {
					keyColor = colorClasses[i];
				}

				var truncated = false;
				if (data[i].title.length > MAX_TEXT_LENGTH) {
					var labelText = data[i].title.substring(0, MAX_TEXT_LENGTH) + '...';
					truncated = true;
				} else {
					var labelText = data[i].title;
				}

				var colorRect = this.rect(x + PADDING * width + columnOffset, y + PADDING * width + rowOffset, 13, 13)
					.addClass(keyColor);
				var title = this.text(
					x + PADDING * width * KEY_TEXT_SPACING + colorRect.getBBox().width + columnOffset,
					y + PADDING * width + rowOffset + parseInt(colorRect.attr('height'), 10) - 1,
					labelText
				)
					.attr({
						'font-family': Config.FONT_FAMILY,
						'font-size': Config.TEXT_SIZE_SMALL
					});

				var itemGroup = this.g(colorRect, title)
					.data('fullText', data[i].title)
				
				//truncated && itemGroup.hover(showFullText, hideFullText, itemGroup);

				items.append(itemGroup);
				columnOffset += parseInt(container.attr('width'), 10) / COLUMNS;
			}

			container.attr({
				height: items.getBBox().height + PADDING * (width * 1.5)
			});

			items.addClass('fm-key-items');

			var key = this.g(container, items)
				.addClass('fm-key')
				.attr({
					strokeDasharray: width + ',' + container.attr('height') + ',0,' + width + ',0'
				});

			return key;
		};
	});
});