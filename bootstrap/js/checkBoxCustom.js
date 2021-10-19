!
function(e) {
	e(document).ready(function() {
		e("#checkBo-catelog-form").checkBo({
			checkAllButton: "#catelog-check-all",
			checkAllTarget: ".catelog-checkbox-row",
			checkAllTextDefault: "全部",
			checkAllTextToggle: "Un-check All"
		});
		e("#checkBo-brand-form").checkBo({
			checkAllButton: "#brand-check-all",
			checkAllTarget: ".brand-checkbox-row",
			checkAllTextDefault: "全部",
			checkAllTextToggle: "Un-check All"
		});
		e("#checkBo-package-form").checkBo({
			checkAllButton: "#package-check-all",
			checkAllTarget: ".package-checkbox-row",
			checkAllTextDefault: "全部",
			checkAllTextToggle: "Un-check All"
		});
		e("#checkBo-volumn-form").checkBo({
			checkAllButton: "#volumn-check-all",
			checkAllTarget: ".volumn-checkbox-row",
			checkAllTextDefault: "全部",
			checkAllTextToggle: "Un-check All"
		});
		e("#checkBox-brand-form-web").checkBo({
			checkAllButton: "#brand-check-web-all",
			checkAllTarget: ".brand-checkbox-row",
			checkAllTextDefault: "全部",
			checkAllTextToggle: "Un-check All"
		});
		e.fn.serializeObject = function() {
			var t = {},
				c = this.serializeArray();
			return e.each(c, function() {
				void 0 !== t[this.name] ? (t[this.name].push || (t[this.name] = [t[this.name]]), t[this.name].push(this.value || "")) : t[this.name] = this.value || ""
			}), t
		};
		e(function() {
/* 			e("#checkBo-catelog-form","#checkBo-brand-form","#checkBo-package-form","#checkBo-volumn-form").submit(function() {
				return e("#checkBo-catelog-form").html(JSON.stringify(e(this).serializeObject(), null, "	")), e(this).next().removeClass("hidden"), !1
			}) */
		});
	})
}(jQuery);