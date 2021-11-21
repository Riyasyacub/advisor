var ymmAPI = "/apps/ymm/get-variant-details.php";
var skulist = ["EK", "RRK", "PRK", "P", "PR", "RB", "MB"];
var items = {}
var add_to_cart_text = '<img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/cart.svg?v=14878978269481446038" alt="" title="" class="icon"> ADD TO CART';
var html = ""
var main_image = ""
var num = 0;
var myhtml = ""
var availability = ""
var disabled = ""
var price_html = "";

function fetch(arr) {
    $.getJSON(ymmAPI, {
        type: "ajax",
        model: "sku",
        format: 'json',
        sku: arr
    }).done(function(data) {
        $("#sku_errors").html("")
        for (let i = 0; i < arr.length; i++) {
            let flag = 0
            for (let j = 0; j < data.length; j++) {
                if (data[j]['sku'] == arr[i]) {
                    items[num + i] = data[j]
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                //            		alert('Invalid SKU :'+ arr[i]);
                $("#sku_errors").html("")
                $("#sku_errors").append('<div class="required-message"><span>Invalid SKU: ' + arr[i] + '</span></div>');
                $("#" + (num + i)).parent().parent().remove();
            }
        }
        console.log(items);
        if (data.length > 0) {
            myhtml = ""
            for (let j = num; j < Object.keys(items).length; j++) {
                availability = ""
                disabled = ""
                price_html = ""
                let i = Object.keys(items)[j]
                console.log(i)
                data = items;
                if (data[i]["in_stock"] == 1) {
                    if (data[i]["product_type"] == "configurable") {
                        add_to_cart_text = '<img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/cart.svg?v=14878978269481446038" alt="" title="" class="icon"> ADD TO CART';
                        var varient_list = data[i]["varient_list"];
                        var varient_html = "";
                        var option_html = "";
                        var option_varient_title = "";
                        if (typeof varient_list !== "undefined" && varient_list.length > 0) {
                            if (varient_list[0]["option_varient_title"] != "" && varient_list[0]["option_varient_title"] != null) {
                                option_varient_title = varient_list[0]["option_varient_title"];
                            }
                            option_varient_title = "Choose Size";
                            varient_html += '<div class="selector-wrapper" style="display:flex;"><label for="productSelect-product-template-option-0">' + option_varient_title + '</label><select class="single-option-selector product_varient_select" product_id=' + data[i]["product_id"] + ' data-option="option1" id="productSelect-product-template-option-0">';
                            varient_html += '<option value="">Choose Size</option>';
                            option_html += '<option value="">Choose Size</option>';
                            for (var v = 0; v < varient_list.length; v++) {
                                if (varient_list[v]["quantity"] > 0) {
                                    var selected_val = "";
                                    if (v == 0) {
                                        selected_val = "selected";
                                    }
                                    option_html += '<option value="' + varient_list[v]["varient_id"] + '" data-title="' + varient_list[v]["title"] + '" data-sku="' + varient_list[v]["sku"] + '">' + varient_list[v]["title"] + '</option>';
                                    varient_html += '<option value="' + varient_list[v]["varient_id"] + '" data-title="' + varient_list[v]["title"] + '" data-sku="' + varient_list[v]["sku"] + '">' + varient_list[v]["title"] + '</option>';
                                }
                            }
                            varient_html += '</select></div>';
                        }
                        console.log("73")
                        price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price: $' + parseFloat(data[i]["price"]) * parseFloat($('#price_' + i).val()) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                        let avail = parseInt(data[i]['quantity']) >= parseInt($("#price_" + i).val()) ? 'Available' : 'Call';
                        if (avail == "Call") {
                            availability = '<div class="availabity" id="availability_' + i + '" >Available Quantity : <span>' + data[i]["quantity"] + '</span></div>'
                            disabled = "disabled"
                            price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price Per Quantity : $' + parseFloat(data[i]["price"]) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                        }

                        html += '<div class="grid-item"><div class="product-grid-item product-list-item"><div class="grid"><div class="grid-item large--one-fifth medium--one-third"><div class="product-list-image"><a href="/products/' + data[i]["url"] + '"><div class="lazyload__image-wrapper" style="padding-top:83.33333333333334%;"><img id="" class="js lazyautosizes lazyloaded grid-main-image" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.2" data-sizes="auto" alt="' + data[i]["image_alt"] + '" data-srcset="' + main_image + '" sizes="198px" srcset="' + main_image + '"></div></a><noscript><img src="' + main_image + '" srcset="' + main_image + '" alt="' + data[i]["image_alt"] + '" style="opacity:1;"></noscript></div></div><div class="grid-item large--three-fifths medium--two-thirds"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["product_name"] + '</a></p><div class="part-no">Part # <span>' + data[i]["sku"] + '</span></div><div class="price-section"><div class="product-item--price"><p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">$' + data[i]["price"] + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p></div><div class="delivery_timer product-delivery"></div><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓">' + varient_html + '<select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template product_varient_hidden_' + data[i]["product_id"] + '" style="display: none;">' + option_html + '</select><div class="quantity_parent_div"><div class="quantity_parent_child"><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="1" name="quantity" id="" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" class="btn add-to-cart ' + data[i]["product_type"] + '-product" id="addToCart-product-template" >' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a><div class="buyers-guide"><a class="buyers-guide-link" href="javascript: void(0);" data-prod-id="' + data[i]["product_id"] + '">Buyers Guide</a><div class="buyers-guide-content" id="buyers_' + data[i]["product_id"] + '"><h2>Buyers Guide: <span>' + data[i]["product_name"] + '</span><a href="javascript: void(0);" class="close"><img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/close.svg?v=12198423699971312732" alt="" title=""></a></h2><table  class="scroll_compact"><thead><tr><th>Year</th><th>Make</th><th>Model</th><th>Engine</th></tr></thead><tbody><tr><td colspan="4" class="loading-spin"><img src="https://cdn.shopify.com/s/files/1/0281/6924/0651/t/12/assets/spinner.gif"></td></tr></tbody></table></div></div></div></form></div></div><div class="grid-item large--one-fifth medium--two-thirds"><div class="product-details">' + $('<div/>').html(data[i]["item_desc"]).text() + '</div></div></div></div></div>';
                        myhtml += '<div class="item divRow" id="row_' + i + '" ><div class="item_ind divCell"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["title"] + '</a></p><div> Part #' + data[i]['sku'] + '</div><div><img src="' + data[i]['main_image'] + '"></div></div><div class="item_desc divCell"><div>' + data[i]['short_des'] + '</div><div><a href="javascript:void[0]" title="' + data[i]['item_desc'] + '" >More Details</a></div><hr><div class="price-section"><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form="" >            <input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓">' + varient_html + '<select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template product_varient_hidden_' + data[i]["product_id"] + '" style="display: none;">' + option_html + '</select><div class="quantity_parent_div"  ><div class="quantity_parent_child" style="display: none;"><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="' + parseInt($('#price_' + i).val()) + '" name="quantity" id="hidden_qty_' + i + '" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" style="display: none;" class="btn add-to-cart ' + data[i]["product_type"] + '-product hidden_addcart_' + i + '" id="addToCart-product-template" >' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" class="btn see-more-info" style="display: none;" >See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a></form></div></div></div><div class="avail divCell"><p id="avail_' + i + '" >' + avail + '</p></div><div class="price divCell"  ><div class="product-item--price">' + price_html + '</div><div>' + availability + '<div class="quantity_parent_div"><input type="number" class="item_qty" value="' + parseInt($('#price_' + i).val()) + '" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" onkeypress="return isNumber(event)" name="" id="i' + i + '" name="quantity"></div></div><div><button class="addcart" type="button" id="add_' + i + '" name="' + data[i]['varient_id'] + '" ' + disabled + '  >Add to Cart</button></div></div></div></div>';
                    } else {
                        if (data[i]["product_type"] == "bundle") {
                            if (data[i]["bundle_type"] == "simple") {
                                //start
                                var option_set = "";
                                option_set += '<div class="bold_option_set">';
                                var options = '';
                                var shop_product_id = parseInt(data[i]["product_id"]);
                                if (typeof data[i]["bundle_options"] != "undefined" && data[i]["bundle_options"].length > 0 && data[i]["bundle_options"][0]["options"].length > 0) {
                                    var options_data = data[i]["bundle_options"][0]["options"];
                                    var price_total_loop = 0;
                                    var name_attributes = [];
                                    var product_attributes = [];
                                    var varient_attributes = [];
                                    var price_attributes = [];
                                    var qty_attributes = [];
                                    var product_features_html = "";

                                    for (var b = 0; b < options_data.length; b++) {
                                        var required_type = "";
                                        if (options_data[b]["is_required"] == 1) {
                                            required_type = "required";
                                        }

                                        if (((options_data[b]["options_values"]).length) > 1) {
                                            if (options_data[b]["type"] == "checkbox") {
                                                options += '<div class="bold_option bold_option_checkbox"><h3>';
                                                options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span></h3>';
                                            }
                                        } else {
                                            if (((options_data[b]["options_values"]).length) == 1) {
                                                var skucode = options_data[b]["options_values"][0]["handle"];
                                                var skuPrefix = skucode.split(/[0-9]/)[0];

                                                if (skulist.indexOf(skuPrefix.toUpperCase()) > -1) {
                                                    if (options_data[b]["type"] == "checkbox") {
                                                        options += '<div class="bold_option bold_option_checkbox"><h3>';
                                                        options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span></h3>';
                                                    }
                                                } else {
                                                    if (options_data[b]["type"] == "checkbox") {
                                                        options += '<div class="bold_option bold_option_checkbox"><h3>';
                                                        options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span></h3>';
                                                    }
                                                }
                                            }
                                        }
                                        if (options_data[b]["options_values"].length > 0) {
                                            var option_value_data = options_data[b]["options_values"];

                                            var checkbox_comma = "";
                                            for (var jb = 0; jb < option_value_data.length; jb++) {
                                                if (jb != 0) {
                                                    checkbox_comma = ", ";
                                                }
                                                if (option_value_data.length == 1) {
                                                    var skucode = option_value_data[jb]["handle"];
                                                    var skuPrefix = skucode.split(/[0-9]/)[0];

                                                    if (skulist.indexOf(skuPrefix.toUpperCase()) <= -1) {
                                                        name_attributes.push(option_value_data[jb]["option_value"]);
                                                        product_attributes.push(option_value_data[jb]["product_id"]);
                                                        varient_attributes.push(option_value_data[jb]["varient_id"]);

                                                        if (option_value_data[jb]["qty"] != "") {
                                                            qty_attributes.push(option_value_data[jb]["qty"]);
                                                        } else {
                                                            qty_attributes.push('1');
                                                        }

                                                        shop_product_id += parseInt(option_value_data[jb]["varient_id"]);
                                                        price_attributes.push(option_value_data[jb]["price"].replace(".", ""));
                                                        product_features_html = product_features_html + "<li>" + option_value_data[jb]["option_value"] + "</li>";
                                                        if (options_data[b]["type"] == "checkbox") {
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + '][]" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    } else {
                                                        if (options_data[b]["type"] == "checkbox") {
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + ']" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    }
                                                } else {
                                                    if (option_value_data[jb]["is_default"] == 1) {
                                                        if (options_data[b]["type"] == "checkbox") {
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + '][]" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    } else {
                                                        if (options_data[b]["type"] == "checkbox") {
                                                            name_attributes.push(option_value_data[jb]["option_value"]);
                                                            product_attributes.push(option_value_data[jb]["product_id"]);
                                                            varient_attributes.push(option_value_data[jb]["varient_id"]);
                                                            if (option_value_data[jb]["qty"] != "") {
                                                                qty_attributes.push(option_value_data[jb]["qty"]);
                                                            } else {
                                                                qty_attributes.push('1');
                                                            }
                                                            shop_product_id += parseInt(option_value_data[jb]["varient_id"]);
                                                            var price_calc = parseInt(option_value_data[jb]["qty"]) * parseFloat(option_value_data[jb]["price"]);
                                                            price_calc = price_calc.toString();
                                                            price_attributes.push(price_calc.replace(".", ""));
                                                            product_features_html = product_features_html + "<li>" + option_value_data[jb]["option_value"] + "</li>";
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + '][]" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        if (options_data[b]["type"] == "checkbox") {
                                            options += '</div>';
                                        }
                                    }

                                    if (name_attributes.length > 0) {
                                        name_attributes = name_attributes.join(",").trim();
                                    }
                                    if (product_attributes.length > 0) {
                                        product_attributes = product_attributes.join(",").trim();
                                    }
                                    if (varient_attributes.length > 0) {
                                        varient_attributes = varient_attributes.join(",").trim();
                                    }
                                    if (qty_attributes.length > 0) {
                                        qty_attributes = qty_attributes.join(",").trim();
                                    }
                                    if (price_attributes.length > 0) {
                                        price_attributes = price_attributes.join(",").trim();
                                        price_attributes = price_attributes.replace(".", "");
                                    }
                                }
                                if (options != "") {
                                    option_set += options;
                                }
                                var total_html = '<div class="bold_option_total"><input type="hidden" name="properties[_boldVariantNames]" data-property-name="_boldVariantNames" value="' + name_attributes + '"><input type="hidden" name="properties[_boldVariantIds]" data-property-name="_boldVariantIds" value="' + varient_attributes + '"><input type="hidden" name="properties[_boldProductIds]" data-property-name="_boldProductIds" value="' + product_attributes + '"><input type="hidden" name="properties[_boldVariantPrices]" data-property-name="_boldVariantPrices" value="0"><input type="hidden" name="properties[_boldVariantQtys]" data-property-name="_boldVariantQtys" value="' + qty_attributes + '"><input type="hidden" name="properties[_boldBuilderId]" data-property-name="_boldBuilderId" value="' + shop_product_id + '"></div>';
                                option_set += total_html + '</div>';
                                console.log("261");
                                price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price: $' + parseFloat(data[i]["price"]) * parseFloat($('#price_' + i).val()) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                                let avail = parseInt(data[i]['quantity']) >= parseInt($("#price_" + i).val()) ? 'Available' : 'Call';
                                if (avail == "Call") {
                                    availability = '<div class="availabity" id="availability_' + i + '" >Available Quantity : <span>' + data[i]["quantity"] + '</span></div>'
                                    disabled = "disabled"
                                    price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price Per Quantity: $' + parseFloat(data[i]["price"]) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                                }
                                html += '<div class="grid-item"><div class="product-grid-item product-list-item"><div class="grid"><div class="grid-item large--one-fifth medium--one-third"><div class="product-list-image"><a href="/products/' + data[i]["url"] + '"><div class="lazyload__image-wrapper" style="padding-top:83.33333333333334%;"><img id="" class="js lazyautosizes lazyloaded grid-main-image" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.2" data-sizes="auto" alt="' + data[i]["image_alt"] + '" data-srcset="' + main_image + '" sizes="198px" srcset="' + main_image + '"></div></a><noscript><img src="' + main_image + '" srcset="' + main_image + '" alt="' + data[i]["image_alt"] + '" style="opacity:1;"></noscript></div></div><div class="grid-item large--three-fifths medium--two-thirds"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["product_name"] + '</a></p><div class="part-no">Part # <span>' + data[i]["sku"] + '</span></div><div class="price-section"><div class="product-item--price"><p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">$' + data[i]["price"] + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p></div><div class="delivery_timer product-delivery"></div><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="' + data[i]["sku"] + '" value="' + data[i]["varient_id"] + '">Default Title - $' + data[i]["price"] + ' USD</option></select>' + option_set + '<div class="quantity_parent_div"><div class="quantity_parent_child"><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="1" name="quantity" id="" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" class="btn add-to-cart ' + data[i]["product_type"] + '-product simple-bundle" id="addToCart-product-template">' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a><div class="buyers-guide"><a class="buyers-guide-link" href="javascript: void(0);" data-prod-id="' + data[i]["product_id"] + '">Buyers Guide</a><div class="buyers-guide-content" id="buyers_' + data[i]["product_id"] + '"><h2>Buyers Guide: <span>' + data[i]["product_name"] + '</span><a href="javascript: void(0);" class="close"><img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/close.svg?v=12198423699971312732" alt="" title=""></a></h2><table  class="scroll_compact"><thead><tr><th>Year</th><th>Make</th><th>Model</th><th>Engine</th></tr></thead><tbody><tr><td colspan="4" class="loading-spin"><img src="https://cdn.shopify.com/s/files/1/0281/6924/0651/t/12/assets/spinner.gif"></td></tr></tbody></table></div></div></div></form></div></div><div class="grid-item large--one-fifth medium--two-thirds"><div class="product-details">' + $('<div/>').html(data[i]["item_desc"]).text() + '</div></div></div></div></div>';
                                myhtml += '<div class="item divRow" id="row_' + i + '" ><div class="item_ind divCell"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["title"] + '</a></p><div> Part #' + data[i]['sku'] + '</div><div><img src="' + data[i]['main_image'] + '"></div></div><div class="item_desc divCell" ><div>' + data[i]['short_des'] + '</div><div><a href="javascript:void[0]" title="' + data[i]['item_desc'] + '" >More Details</a></div><hr><div class="price-section"><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="' + data[i]["sku"] + '" value="' + data[i]["varient_id"] + '">Default Title - $' + data[i]["price"] + ' USD</option></select>' + option_set + '<div class="quantity_parent_div"><div class="quantity_parent_child" style="display: none;"><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="' + parseInt($("#price_" + i).val()) + '" name="quantity" id="hidden_qty_' + i + '" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" style= "display: none;" class="btn add-to-cart ' + data[i]["product_type"] + '-product simple-bundle hidden_addcart_' + i + ' " id="addToCart-product-template">' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" style="display: none;" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a></div></div></div><div class="avail divCell" ><p id="avail_' + i + '">' + avail + '</p></div><div class="price divCell"><div class="product-item--price">' + price_html + '</div><div>' + availability + '<div class="quantity_parent_div"><span class="qty_label">Qty: </span><div class="js-qty"><input type="text" class="js--num item_qty" value="' + parseInt($('#price_' + i).val()) + '" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" onkeypress="return isNumber(event)" name="" id="i' + i + '" name="quantity"><span class="js--qty-adjuster js--add" data-id="" data-qty="">+</span><span class="js--qty-adjuster js--minus" data-id="" data-qty="">-</span></div></div></div><div><button class="addcart" type="button" id="add_' + i + '" name="' + data[i]['varient_id'] + '" ' + disabled + '  >Add to Cart</button></div></div></div></div>';
                                //end
                            } else {
                                //start
                                var option_set = "";
                                option_set += '<div class="bold_option_set">';
                                var options = '';
                                var shop_product_id = parseInt(data[i]["product_id"]);
                                if (typeof data[i]["bundle_options"] != "undefined" && data[i]["bundle_options"].length > 0 && data[i]["bundle_options"][0]["options"].length > 0) {
                                    var options_data = data[i]["bundle_options"][0]["options"];
                                    var price_total_loop = 0;
                                    var name_attributes = [];
                                    var product_attributes = [];
                                    var varient_attributes = [];
                                    var price_attributes = [];
                                    var qty_attributes = [];
                                    var product_features_html = "";

                                    for (var b = 0; b < options_data.length; b++) {
                                        var required_type = "";
                                        if (options_data[b]["is_required"] == 1) {
                                            required_type = "required";
                                        }

                                        if (((options_data[b]["options_values"]).length) > 1) {
                                            if (options_data[b]["type"] == "select") {
                                                options += '<div class="bold_option bold_option_dropdown"><label>';
                                                options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span>';
                                                options += '<span class="bold_option_element"><select id="dd_select_' + b + '" attr-name="' + options_data[b]["bundle_option_name"] + '" name="properties[' + options_data[b]["bundle_option_name"] + ']" class="dd_' + options_data[b]["bundle_option_set_id"] + '_' + options_data[b]["bundle_option_id"] + '"  ' + "select_" + b + " " + required_type + '>';
                                            } else if (options_data[b]["type"] == "checkbox") {
                                                options += '<div class="bold_option bold_option_checkbox"><h3>';
                                                options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span></h3>';
                                            }
                                        } else {
                                            if (((options_data[b]["options_values"]).length) == 1) {
                                                var skucode = options_data[b]["options_values"][0]["handle"];
                                                var skuPrefix = skucode.split(/[0-9]/)[0];

                                                if (skulist.indexOf(skuPrefix.toUpperCase()) > -1) {
                                                    if (options_data[b]["type"] == "select") {
                                                        options += '<div class="bold_option bold_option_dropdown" style="display: none;"><label>';
                                                        options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span>';
                                                        options += '<span class="bold_option_element"><select id="dd_select_' + b + '" attr-name="' + options_data[b]["bundle_option_name"] + '" name="properties[' + options_data[b]["bundle_option_name"] + ']" class="dd_' + options_data[b]["bundle_option_set_id"] + '_' + options_data[b]["bundle_option_id"] + '"  ' + "select_" + b + " " + required_type + '>';
                                                    } else if (options_data[b]["type"] == "checkbox") {
                                                        options += '<div class="bold_option bold_option_checkbox"><h3>';
                                                        options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span></h3>';
                                                    }
                                                } else {
                                                    if (options_data[b]["type"] == "select") {
                                                        options += '<div class="bold_option bold_option_dropdown" style="display: none;"><label>';
                                                        options += '<span class="bold_option_element"><select id="dd_select_' + b + '" style="display: none;" name="properties[' + options_data[b]["bundle_option_name"] + ']" class="dd_' + options_data[b]["bundle_option_set_id"] + '_' + options_data[b]["bundle_option_id"] + '"  ' + "select_" + b + " " + required_type + '>';
                                                    } else if (options_data[b]["type"] == "checkbox") {
                                                        options += '<div class="bold_option bold_option_checkbox"><h3>';
                                                        options += '<span class="bold_option_title">' + options_data[b]["bundle_option_name"] + '</span></h3>';
                                                    }
                                                }
                                            }
                                        }

                                        if (options_data[b]["options_values"].length > 0) {
                                            var option_value_data = options_data[b]["options_values"];
                                            if (options_data[b]["type"] == "select") {
                                                options += '<option value="">-- Choose ' + options_data[b]["bundle_option_name"] + ' (Choose Oversize) --</option>';
                                            }

                                            var checkbox_comma = "";
                                            for (var jb = 0; jb < option_value_data.length; jb++) {
                                                if (jb != 0) {
                                                    checkbox_comma = ", ";
                                                }
                                                if (option_value_data.length == 1) {
                                                    var skucode = option_value_data[jb]["handle"];
                                                    var skuPrefix = skucode.split(/[0-9]/)[0];

                                                    if (skulist.indexOf(skuPrefix.toUpperCase()) <= -1) {
                                                        name_attributes.push(option_value_data[jb]["option_value"]);
                                                        product_attributes.push(option_value_data[jb]["product_id"]);
                                                        varient_attributes.push(option_value_data[jb]["varient_id"]);

                                                        if (option_value_data[jb]["qty"] != "") {
                                                            qty_attributes.push(option_value_data[jb]["qty"]);
                                                        } else {
                                                            qty_attributes.push('1');
                                                        }

                                                        shop_product_id += parseInt(option_value_data[jb]["varient_id"]);
                                                        price_attributes.push(option_value_data[jb]["price"].replace(".", ""));
                                                        product_features_html = product_features_html + "<li>" + option_value_data[jb]["option_value"] + "</li>";
                                                        if (options_data[b]["type"] == "select") {
                                                            options += '<option value="' + option_value_data[jb]["option_value"] + '" data-option_value_key="' + jb + '" selected>' + option_value_data[jb]["option_value"] + '</option>';
                                                        } else if (options_data[b]["type"] == "checkbox") {
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + '][]" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    } else {
                                                        if (options_data[b]["type"] == "select") {
                                                            options += '<option value="' + option_value_data[jb]["option_value"] + '" data-option_value_key="' + jb + '">' + option_value_data[jb]["option_value"] + '</option>';
                                                        } else if (options_data[b]["type"] == "checkbox") {
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + ']" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    }
                                                } else {
                                                    if (option_value_data[jb]["is_default"] == 1) {
                                                        if (options_data[b]["type"] == "select") {
                                                            var selected = "selected";
                                                            selected = "";
                                                            options += '<option ' + selected + ' class = option_' + jb + ' value="' + option_value_data[jb]["option_value"] + '" data-option_value_key="' + jb + '">' + option_value_data[jb]["option_value"] + '</option>';
                                                        } else if (options_data[b]["type"] == "checkbox") {
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + '][]" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    } else {
                                                        if (options_data[b]["type"] == "select") {
                                                            options += '<option class = option_' + jb + ' value="' + option_value_data[jb]["option_value"] + '" data-option_value_key="' + jb + '">' + option_value_data[jb]["option_value"] + '</option>';
                                                        } else if (options_data[b]["type"] == "checkbox") {
                                                            name_attributes.push(option_value_data[jb]["option_value"]);
                                                            product_attributes.push(option_value_data[jb]["product_id"]);
                                                            varient_attributes.push(option_value_data[jb]["varient_id"]);
                                                            if (option_value_data[jb]["qty"] != "") {
                                                                qty_attributes.push(option_value_data[jb]["qty"]);
                                                            } else {
                                                                qty_attributes.push('1');
                                                            }
                                                            shop_product_id += parseInt(option_value_data[jb]["varient_id"]);
                                                            var price_calc = parseInt(option_value_data[jb]["qty"]) * parseFloat(option_value_data[jb]["price"]);
                                                            price_calc = price_calc.toString();
                                                            price_attributes.push(price_calc.replace(".", ""));
                                                            product_features_html = product_features_html + "<li>" + option_value_data[jb]["option_value"] + "</li>";
                                                            options += '<div class="field choice"><input class="checkbox"  style="display: none" type="checkbox" name="properties[' + options_data[b]["bundle_option_name"] + '][]" checked="checked" value="' + checkbox_comma + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '"><label class="label">' + option_value_data[jb]["qty"] + ' x ' + option_value_data[jb]["option_value"] + '</label></div>';
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        if (options_data[b]["type"] == "select") {
                                            options += '</select></span></label></div>';
                                        } else if (options_data[b]["type"] == "checkbox") {
                                            options += '</div>';
                                        }
                                    }

                                    if (name_attributes.length > 0) {
                                        name_attributes = name_attributes.join(",").trim();
                                    }
                                    if (product_attributes.length > 0) {
                                        product_attributes = product_attributes.join(",").trim();
                                    }
                                    if (varient_attributes.length > 0) {
                                        varient_attributes = varient_attributes.join(",").trim();
                                    }
                                    if (qty_attributes.length > 0) {
                                        qty_attributes = qty_attributes.join(",").trim();
                                    }
                                    if (price_attributes.length > 0) {
                                        price_attributes = price_attributes.join(",").trim();
                                        price_attributes = price_attributes.replace(".", "");
                                    }
                                }
                                if (options != "") {
                                    option_set += options;
                                }
                                var total_html = '<div class="bold_option_total"><input type="hidden" name="properties[_boldVariantNames]" data-property-name="_boldVariantNames" value="' + name_attributes + '"><input type="hidden" name="properties[_boldVariantIds]" data-property-name="_boldVariantIds" value="' + varient_attributes + '"><input type="hidden" name="properties[_boldProductIds]" data-property-name="_boldProductIds" value="' + product_attributes + '"><input type="hidden" name="properties[_boldVariantPrices]" data-property-name="_boldVariantPrices" value="0"><input type="hidden" name="properties[_boldVariantQtys]" data-property-name="_boldVariantQtys" value="' + qty_attributes + '"><input type="hidden" name="properties[_boldBuilderId]" data-property-name="_boldBuilderId" value="' + shop_product_id + '"></div>';

                                option_set += total_html + '</div>';
                                //console.log(option_set);
                                let avail = parseInt(data[i]['quantity']) >= parseInt($("#price_" + i).val()) ? 'Available' : 'Call';
                                console.log("474")
                                price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price: $' + parseFloat(data[i]["price"]) * parseFloat($('#price_' + i).val()) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                                if (avail == "Call") {
                                    availability = '<div class="availabity" id="availability_' + i + '" >Available Quantity : <span>' + data[i]["quantity"] + '</span></div>'
                                    disabled = "disabled"
                                    price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price Per Quantity: $' + parseFloat(data[i]["price"]) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                                }
                                html += '<div class="grid-item"><div class="product-grid-item product-list-item"><div class="grid"><div class="grid-item large--one-fifth medium--one-third"><div class="product-list-image"><a href="/products/' + data[i]["url"] + '"><div class="lazyload__image-wrapper" style="padding-top:83.33333333333334%;"><img id="" class="js lazyautosizes lazyloaded grid-main-image" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.2" data-sizes="auto" alt="' + data[i]["image_alt"] + '" data-srcset="' + main_image + '" sizes="198px" srcset="' + main_image + '"></div></a><noscript><img src="' + main_image + '" srcset="' + main_image + '" alt="' + data[i]["image_alt"] + '" style="opacity:1;"></noscript></div></div><div class="grid-item large--three-fifths medium--two-thirds"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["product_name"] + '</a></p><div class="part-no">Part # <span>' + data[i]["sku"] + '</span></div><div class="price-section"><div class="product-item--price"><p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">$' + data[i]["price"] + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p></div><div class="delivery_timer product-delivery"></div><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="' + data[i]["sku"] + '" value="' + data[i]["varient_id"] + '">Default Title - $' + data[i]["price"] + ' USD</option></select>' + option_set + '<div class="quantity_parent_div"><div class="quantity_parent_child"><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="1" name="quantity" id="" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" class="btn add-to-cart ' + data[i]["product_type"] + '-product simple-bundle" id="addToCart-product-template">' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a><div class="buyers-guide"><a class="buyers-guide-link" href="javascript: void(0);" data-prod-id="' + data[i]["product_id"] + '">Buyers Guide</a><div class="buyers-guide-content" id="buyers_' + data[i]["product_id"] + '"><h2>Buyers Guide: <span>' + data[i]["product_name"] + '</span><a href="javascript: void(0);" class="close"><img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/close.svg?v=12198423699971312732" alt="" title=""></a></h2><table  class="scroll_compact"><thead><tr><th>Year</th><th>Make</th><th>Model</th><th>Engine</th></tr></thead><tbody><tr><td colspan="4" class="loading-spin"><img src="https://cdn.shopify.com/s/files/1/0281/6924/0651/t/12/assets/spinner.gif"></td></tr></tbody></table></div></div></div></form></div></div><div class="grid-item large--one-fifth medium--two-thirds"><div class="product-details">' + $('<div/>').html(data[i]["item_desc"]).text() + '</div></div></div></div></div>';
                                myhtml += '<div class="item divRow" id="row_' + i + '" ><div class="item_ind divCell"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["title"] + '</a></p><div> Part #' + data[i]['sku'] + '</div><div><img src="' + data[i]['main_image'] + '"></div></div><div class="item_desc divCell" ><div>' + data[i]['short_des'] + '</div><div><a href="javascript:void[0]" title="' + data[i]['item_desc'] + '" >More Details</a></div><hr><div class="price-section"><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="' + data[i]["sku"] + '" value="' + data[i]["varient_id"] + '">Default Title - $' + data[i]["price"] + ' USD</option></select>' + option_set + '<div class="quantity_parent_div" ><div class="quantity_parent_child" style="display: none;" ><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="' + parseInt($("#price_" + i).val()) + '" name="quantity" id="hidden_qty_' + i + '" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" style="display: none;" class="btn add-to-cart ' + data[i]["product_type"] + '-product simple-bundle hidden_addcart_' + i + ' " id="addToCart-product-template">' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" class="btn see-more-info" style="display: none;" >See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a></div></div></div><div class="avail divCell"><p id="avail_' + i + '" >' + avail + '</p></div><div class="price divCell"><div class="product-item--price"><p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price: $' + parseFloat(data[i]["price"]) * parseFloat($('#price_' + i).val()) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p></div><div>' + availability + '<div class="quantity_parent_div"><span class="qty_label">Qty: </span><div class="js-qty"><input type="text" class="js--num item_qty" value="' + parseInt($('#price_' + i).val()) + '" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" onkeypress="return isNumber(event)" name="" id="i' + i + '" name="quantity"><span class="js--qty-adjuster js--add" data-id="" data-qty="">+</span><span class="js--qty-adjuster js--minus" data-id="" data-qty="">-</span></div></div></div><div><button class="addcart" type="button" id="add_' + i + '" name="' + data[i]['varient_id'] + '" ' + disabled + '  >Add to Cart</button></div></div></div></div>'
                                //end
                            }
                        } else {
                            console.log("526")
                            price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price: $' + parseFloat(data[i]["price"]) * parseFloat($('#price_' + i).val()) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                            let avail = parseInt(data[i]['quantity']) >= parseInt($("#price_" + i).val()) ? 'Available' : 'Call';
                            if (avail == "Call") {
                                availability = '<div class="availabity" id="availability_' + i + '" >Available Quantity : <span>' + data[i]["quantity"] + '</span></div>'
                                disabled = "disabled"
                                price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price Per Quantity: $' + parseFloat(data[i]["price"]) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                            }
                            html += '<div class="grid-item"><div class="product-grid-item product-list-item"><div class="grid"><div class="grid-item large--one-fifth medium--one-third"><div class="product-list-image"><a href="/products/' + data[i]["url"] + '"><div class="lazyload__image-wrapper" style="padding-top:83.33333333333334%;"><img id="" class="js lazyautosizes lazyloaded grid-main-image" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.2" data-sizes="auto" alt="' + data[i]["image_alt"] + '" data-srcset="' + main_image + '" sizes="198px" srcset="' + main_image + '"></div></a><noscript><img src="' + main_image + '" srcset="' + main_image + '" alt="' + data[i]["image_alt"] + '" style="opacity:1;"></noscript></div></div><div class="grid-item large--three-fifths medium--two-thirds"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["product_name"] + '</a></p><div class="part-no">Part # <span>' + data[i]["sku"] + '</span></div><div class="price-section"><div class="product-item--price"><p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">$' + data[i]["price"] + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p></div><div class="delivery_timer product-delivery"></div><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="' + data[i]["sku"] + '" value="' + data[i]["varient_id"] + '">Default Title - $' + data[i]["price"] + ' USD</option></select><div class="quantity_parent_div"><div class="quantity_parent_child"><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="1" name="quantity" id="" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" class="btn add-to-cart ' + data[i]["product_type"] + '-product" id="addToCart-product-template">' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a><div class="buyers-guide"><a class="buyers-guide-link" href="javascript: void(0);" data-prod-id="' + data[i]["product_id"] + '">Buyers Guide</a><div class="buyers-guide-content" id="buyers_' + data[i]["product_id"] + '"><h2>Buyers Guide: <span>' + data[i]["product_name"] + '</span><a href="javascript: void(0);" class="close"><img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/close.svg?v=12198423699971312732" alt="" title=""></a></h2><table  class="scroll_compact"><thead><tr><th>Year</th><th>Make</th><th>Model</th><th>Engine</th></tr></thead><tbody><tr><td colspan="4" class="loading-spin"><img src="https://cdn.shopify.com/s/files/1/0281/6924/0651/t/12/assets/spinner.gif"></td></tr></tbody></table></div></div></div></form></div></div><div class="grid-item large--one-fifth medium--two-thirds"><div class="product-details">' + $('<div/>').html(data[i]["item_desc"]).text() + '</div></div></div></div></div>';
                            myhtml += '<div class="item divRow" id="row_' + i + '" ><div class="item_ind divCell"  ><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["title"] + '</a></p><div> Part #' + data[i]['sku'] + '</div><div><img src="' + data[i]['main_image'] + '"></div></div><div class="item_desc divCell" ><div>' + data[i]['short_des'] + '</div><div><a href="javascript:void[0]" title="' + data[i]['item_desc'] + '" >More Details</a></div><hr><div class="price-section"><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="' + data[i]["sku"] + '" value="' + data[i]["varient_id"] + '">Default Title - $' + data[i]["price"] + ' USD</option></select><div class="quantity_parent_div"  ><div class="quantity_parent_child" style="display: none;" ><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="' + parseInt($("#price_" + i).val()) + '" name="quantity" id="hidden_qty_' + i + '" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" style="display: none;" class="btn add-to-cart ' + data[i]["product_type"] + '-product hidden_addcart_' + i + ' " id="addToCart-product-template">' + add_to_cart_text + '</button><a href="/products/' + data[i]["url"] + '" style="display: none;" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a></form></div></div></div><div class="avail divCell" ><p id="avail_' + i + '" >' + avail + '</p></div><div class="price divCell"  ><div class="product-item--price">' + price_html + '	</div><div>' + availability + '<div class="quantity_parent_div"><span class="qty_label">Qty: </span><div class="js-qty"><input type="text" class="js--num item_qty" value="' + parseInt($('#price_' + i).val()) + '" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" onkeypress="return isNumber(event)" name="" id="i' + i + '" name="quantity"><span class="js--qty-adjuster js--add" data-id="" data-qty="">+</span><span class="js--qty-adjuster js--minus" data-id="" data-qty="">-</span></div></div></div><div><button class="addcart" type="button" id="add_' + i + '" name="' + data[i]['varient_id'] + '" ' + disabled + ' >Add to Cart</button></div></div></div></div>';
                        }
                        //html+='<div class="grid-item"><div class="product-grid-item product-list-item"><div class="grid"><div class="grid-item large--one-fifth medium--one-third"><div class="product-list-image"><a href="/products/'+data[i]["url"]+'"><div class="lazyload__image-wrapper" style="padding-top:83.33333333333334%;"><img id="" class="js lazyautosizes lazyloaded grid-main-image" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.2" data-sizes="auto" alt="'+data[i]["image_alt"]+'" data-srcset="'+main_image+'" sizes="198px" srcset="'+main_image+'"></div></a><noscript><img src="'+main_image+'" srcset="'+main_image+'" alt="'+data[i]["image_alt"]+'" style="opacity:1;"></noscript></div></div><div class="grid-item large--three-fifths medium--two-thirds"><p class="h6"><a href="/products/'+data[i]["url"]+'">'+data[i]["product_name"]+'</a></p><div class="part-no">Part # <span>'+data[i]["sku"]+'</span></div><div class="price-section"><div class="product-item--price"><p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">$'+data[i]["price"]+'</small><span class="visually-hidden">Rs. '+data[i]["price"]+'</span></p></div><div class="delivery_timer product-delivery"></div><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="'+data[i]["sku"]+'" value="'+data[i]["varient_id"]+'">Default Title - $'+data[i]["price"]+' USD</option></select><div class="quantity_parent_div"><div class="quantity_parent_child"><span class="qty_label">Qty: </span><span class="catalog--qty-adjuster catalog--js--minus" data-qty="0">-</span><input type="text" value="1" name="quantity" id="" class="" pattern="[0-9]*" onkeypress="return isNumber(event)"><span class="catalog--qty-adjuster catalog--js--add" data-qty="2">+</span></div></div><button type="button" class="btn add-to-cart '+data[i]["product_type"]+'-product" id="addToCart-product-template">'+add_to_cart_text+'</button><a href="/products/'+data[i]["url"]+'" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a><div class="buyers-guide"><a class="buyers-guide-link" href="javascript: void(0);" data-prod-id="'+data[i]["product_id"]+'">Buyers Guide</a><div class="buyers-guide-content" id="buyers_'+data[i]["product_id"]+'"><h2>Buyers Guide: <span>'+data[i]["product_name"]+'</span><a href="javascript: void(0);" class="close"><img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/close.svg?v=12198423699971312732" alt="" title=""></a></h2><table  class="scroll_compact"><thead><tr><th>Year</th><th>Make</th><th>Model</th><th>Engine</th></tr></thead><tbody><tr><td colspan="4" class="loading-spin"><img src="https://cdn.shopify.com/s/files/1/0281/6924/0651/t/12/assets/spinner.gif"></td></tr></tbody></table></div></div></div></form></div></div><div class="grid-item large--one-fifth medium--two-thirds"><div class="product-details">'+$('<div/>').html(data[i]["item_desc"]).text()+'</div></div></div></div></div>';
                    }
                } else {
                    console.log("416")
                    let avail = "Call"
                    if (avail == "Call") {
                        availability = '<div class="availabity" id="availability_' + i + '" >Available Quantity : <span>' + data[i]["quantity"] + '</span></div>'
                        disabled = "disabled"
                        price_html = '<p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">Price Per Quantity : $' + parseFloat(data[i]["price"]) + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p>'
                    }
                    html += '<div class="grid-item"><div class="product-grid-item product-list-item out-of-stock-list-item"><div class="grid"><div class="grid-item large--one-fifth medium--one-third"><div class="product-list-image"><a href="/products/' + data[i]["url"] + '"><div class="lazyload__image-wrapper" style="padding-top:83.33333333333334%;"><img id="" class="js lazyautosizes lazyloaded grid-main-image" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.2" data-sizes="auto" alt="' + data[i]["image_alt"] + '" data-srcset="' + main_image + '" sizes="198px" srcset="' + main_image + '"></div></a><noscript><img src="' + main_image + '" srcset="' + main_image + '" alt="' + data[i]["image_alt"] + '" style="opacity:1;"></noscript></div></div><div class="grid-item large--three-fifths medium--two-thirds"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["product_name"] + '</a></p><div class="part-no">Part # <span>' + data[i]["sku"] + '</span></div><div class="price-section out-of-stock-price"><div class="part-no">Part # <span>' + data[i]["sku"] + '</span></div><!--<div class="product-item--price"><p class="h1 medium-down--left"><span class="visually-hidden">Regular price</span><small aria-hidden="true">$' + data[i]["price"] + '</small><span class="visually-hidden">$ ' + data[i]["price"] + '</span></p></div>--><div class="delivery_timer product-delivery"></div><div class="product-actions product-list-template"><form method="post" action="/cart/add" id="addToCartForm-product-template" accept-charset="UTF-8" class="customize-content addToCartForm addToCartForm--payment-button" enctype="multipart/form-data" data-product-form=""><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><select name="id" id="productSelect-product-template" class="product-variants product-variants-product-template" style="display: none;"><option selected="selected" data-sku="' + data[i]["sku"] + '" value="' + data[i]["varient_id"] + '">Default Title - $' + data[i]["price"] + ' USD</option></select><input type="hidden" value="1" name="quantity" id="" class=""><button type="button" class="btn add-to-cart out-of-stock" >Out of Stock</button><a href="/products/' + data[i]["url"] + '" class="btn see-more-info">See more info <img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/arrow-right.svg?v=13848028441984674738" alt="" title="" class="icon"></a><div class="buyers-guide"><a class="buyers-guide-link" href="javascript: void(0);" data-prod-id="' + data[i]["product_id"] + '">Buyers Guide</a><div class="buyers-guide-content" id="buyers_' + data[i]["product_id"] + '"><h2>Buyers Guide: <span>' + data[i]["product_name"] + '</span><a href="javascript: void(0);" class="close"><img src="//cdn.shopify.com/s/files/1/0454/6304/4257/t/2/assets/close.svg?v=12198423699971312732" alt="" title=""></a></h2><table  class="scroll_compact"><thead><tr><th>Year</th><th>Make</th><th>Model</th><th>Engine</th></tr></thead><tbody><tr><td colspan="4" class="loading-spin"><img src="https://cdn.shopify.com/s/files/1/0281/6924/0651/t/12/assets/spinner.gif"></td></tr></tbody></table></div></div></div></form></div></div><div class="grid-item large--one-fifth medium--two-thirds"><div class="product-details">' + $('<div/>').html(data[i]["item_desc"]).text() + '</div></div></div></div></div>';
                    myhtml += '<div class="item divRow" id="row_' + i + '" ><div class="item_ind divCell"><p class="h6"><a href="/products/' + data[i]["url"] + '">' + data[i]["title"] + '</a></p><div> Part #' + data[i]['sku'] + '</div><div><img src="' + data[i]['main_image'] + '"></div></div><div class="item_desc divCell" ><div>' + data[i]['short_des'] + '</div><div><a href="javascript:void[0]" title="' + data[i]['item_desc'] + '" >More Details</a></div></div><div class="avail divCell" ><p id="avail_' + i + '" >' + avail + '</p></div><div class="price divCell"><div class="product-item--price">' + price_html + '</div><div>' + availability + '<div class="quantity_parent_div"><span class="qty_label">Qty: </span><div class="js-qty"><input type="text" class="js--num item_qty" value="' + parseInt($('#price_' + i).val()) + '" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" onkeypress="return isNumber(event)" name="" id="i' + i + '" name="quantity"><span class="js--qty-adjuster js--add" data-id="" data-qty="">+</span><span class="js--qty-adjuster js--minus" data-id="" data-qty="">-</span></div></div><div><button class="addcart" type="button" id="add_' + i + '" name="' + data[i]['varient_id'] + '" ' + disabled + ' >Add to Cart</button></div></div></div></div>';
                }
            }
        }

        num += arr.length
        $(".items").append(myhtml);
        qtySelectors()
    });
}


function validateQty(qty) {
    if ((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
        // We have a valid number!
        return qty;
    } else {
        // Not a number. Default to 1.
        return 1;
    }
};
qtySelectors = function() {
    var numInputs = $('input[type="number"]');
    var qtyMin = 0;

    if (numInputs.length) {
        numInputs.each(function() {
            var el = $(this),
                currentQty = parseInt(el.val()),
                inputName = el.attr('name'),
                inputId = el.attr('id');

            var itemAdd = currentQty + 1,
                itemMinus = currentQty - 1,
                itemQty = currentQty;

            var source = $("#jsQty").html(),
                template = Handlebars.compile(source),
                data = {
                    key: el.data('id'),
                    itemQty: itemQty,
                    itemAdd: itemAdd,
                    itemMinus: itemMinus,
                    inputName: inputName,
                    inputId: inputId
                };

            // Append new quantity selector then remove original
            el.after(template(data)).remove();
        });
    }
};

// theme.js copy -- end
// function fetch(arr){
//   console.log(arr)   
// }

// adding row after entering sku(valid) and quantity
let addrow = function() {
    if ($('.inp:last-child input:first').val() && $('.inp:last-child input:last').val()) {
        $('.inp:last-child input:first').attr('name', $('.inp:last-child input:first').val())
        $('.inp:last-child input:last').attr('name', 'price_' + $('.inp:last-child input:first').val())
        $('.inp:last-child input:first').attr('id', num)
        $('.inp:last-child input:last').attr('id', 'price_' + num)

        $('.inp:last-child').append('<div class="divCell"><button type="button" class="del" id="del_' + num + '"  >Delete</button></div>');
        let res = []
        res.push($('.inp:last-child input:first').val())
        res.push($('.inp:last-child input:last').val())
        var str = "";
        str = '<div class="inp divRow"><div class="divCell" ><input type="text" id="new_sku" placeholder="Enter Item Number"></div><div class="divCell" ><div class="js-qty"><input type="text" class="js--num quan" value="" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" name="" id="new_qty"><span class="js--qty-adjuster js--add" data-id="" data-qty="">+</span><span class="js--qty-adjuster js--minus" data-id="" data-qty="">-</span></div></div></div>';
        $('.entry').append(str);
        fetch([res[0]]);

    }
}

// adding row after focusout and pressing enter
$(document).on('focusout', '.inp:last-child input:last', addrow);
$(document).keypress('.inp:last-child input:last', function(e) {
    var key = e.which;
    if (key == 13)
    {
        addrow();
    }
});


// changing the required fields after changing quantity in the upper table
$(document).on('change', '.quan', function() {
    if ($("#i" + $(this).attr('name').slice(6)).length) {
        $("#i" + $(this).attr('name').slice(6)).val($(this).val());
        items[$(this).attr('name').slice(6)]['qty'] = $(this).val()
        appenditems($(this).attr('name').slice(6), $(this).val(), 1)
    }
});


// deleting elements after clicking delete button
$(document).on('click', '.del', function() {
    let items_key = $(this).attr("id").slice(4)
    $(this).parent().parent().remove();
    $('.items').children('#row_' + items_key).remove();
    //   delete items[variant_id]
});


// // changing the required fields after clicking another variant in the lower table
// $(document).on('click','.variants',function(){
//   	let old_id = $(this).parent().parent().parent().parent().attr('name').slice(5)
//     let sku = $('#'+old_id).val()
//  	$(this).parent().parent().parent().parent().remove();
//   	let new_id = $(this).attr('name').slice(8)
//     let qty = $("#price_"+old_id).val();
//     $("#"+old_id).attr('name',new_id);
//     $("#price_"+old_id).attr('name',"price_"+new_id)
// 	delete items[old_id]
// 	display_variant_items([new_id,qty],old_id);

// });


// adding all items to cart 
$(document).on('click', '#add_all_items_to_cart', function() {
    for (let i = 0; i < $(".addcart").length; i++) {
      $(".addcart").eq(i).click();
    }
});

// adding single element to the cart
$(document).on('click', '.addcart', function() {
    let items_key = $(this).attr('id').slice(4)
    $(".hidden_addcart_" + items_key).click();
});

// adding elements through the text area
$(document).on('change', '#textarea', function() {
    let text_str = $("#textarea").val()
    if (text_str.charAt(-1) != '\n') {
        $("#textarea").val(text_str + '\n');
    }
    let text = $("#textarea").val().split('\n');
    for (let i = 0; i < text.length; i++) {
        let itext = $.trim(text[i]).split(',');
        if (itext != '') {
            $('#new_sku').val($.trim(itext[0]));
            $('#new_qty').val($.trim(itext[1]));
            addrow();
        }
    }
    $("#textarea").val("");


});


// CSV file Handling
$(document).ready(function() {
    $('#filename').on('change', function() {
        var csv = $('#filename');
        var csvFile = csv[0].files[0];
        var ext = csv.val().split(".").pop().toLowerCase();

        if ($.inArray(ext, ["csv"]) === -1) {
            $("#csv_errors").html('<div class="required-message"><span>Upload only CSV files</span></div>')
            return false;
        }
        if (csvFile != undefined) {
            reader = new FileReader();
            reader.onload = function(e) {
                csvResult = e.target.result.split(/\r|\n|\r\n/);
                $("#csv_errors").html("")
                let str = "";
                let i = 0;
                let arr = []
                for (let j = 0; j < csvResult.length; j++) {
                    if (csvResult[j] != "") {
                        let res = csvResult[j].split(",");
                        if (res[1] != "" && res[0] != "" && csvResult[j] != "") {
                            console.log(num)
                            arr.push(res[0]);
                            str += '<div class="inp divRow " ><div class="divCell" ><input type="text" id="' + (i + num) + '" value="' + res[0] + '"></div><div class="divCell" ><input type="number" class="quan" id="price_' + (i + num) + '" value="' + res[1] + '"></div><div class="divCell" ><button type="button" class="del" id="del_' + (i + num) + '" >Delete</button></div></div>';
                        }
                        i++;
                    }
                }
                $('.entry').prepend(str);
                fetch(arr);

            }
            reader.readAsText(csvFile);
        }
      	$("#filename").reset();
    });
});


function quantityChange(items_key) {
    let value = parseInt($("#" + items_key).val())
    if (items_key.charAt(0) == 'i') {
        items_key = items_key.slice(1);
    } else if (items_key.charAt(0) == 'p') {
        items_key = items_key.slice(6);
    }
    $("#i" + items_key).val(value)
    $("#price_" + items_key).val(value)
    $("#hidden_qty_" + items_key).val(value)
    if (items[items_key] != undefined) {
        if (items[items_key]['quantity'] < value) {
            if ($("#availability_" + items_key).length < 1) {
                $("#add_" + resp - items_key).prop("disabled", true)
                availability = '<div class="availabity" id="availability_' + items_key + '" >Available Quantity : <span>' + items[items_key]["quantity"] + '</span></div>'
                $("#i" + items_key).parent().parent().parent().prepend(availability)
                $("#avail_" + items_key).text("Call")
                $("#row_" + items_key + " .price small").text("Price Per Quantity: $" + items[items_key]["price"]);
            }
        } else {
            if ($("#availability_" + items_key).length) {
                $("#availability_" + items_key).remove();
            }
            $("#add_" + items_key).prop("disabled", false);
            $("#avail_" + items_key).text("Available");
            $("#row_" + items_key + " .price small").text("Price: $" + parseFloat(items[items_key]["price"]) * parseFloat(value));
        }
    }
}


$(document).on('change', '.js--num', function() {
    quantityChange($(this).attr("id"));
});