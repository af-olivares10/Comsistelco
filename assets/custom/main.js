function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(window.location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


$(document).ready(function () {
	$.get("https://intellgentcms.herokuapp.com/api/pageCategories",data=>{
		data.pageCategories.filter(pc=> pc.location ==="Barra").forEach((pc)=>{
			$("#last-predefined-on-bar").after(`
				<li class="nav-item dropdown work-please" >
				<a class="nav-link link mbr-black text-black dropdown-toggle display-4" href="index.html" aria-expanded="true" data-toggle="dropdown-submenu">
				${pc.name}</a>
				<div class="dropdown-menu menu-doble">
				<div class="container" style="padding: 0; margin: 0;">
				<div class="row" style="padding: 0; margin: 0;">
				<div class="col-md-6 col-12" id ="page-menu-column-1-${pc.name.replace(/\s/g, '')}" style="padding: 0; margin: 0;">
				</div>
				<div class="col-md-6 col-12" id ="page-menu-column-2-${pc.name.replace(/\s/g, '')}">
				</div>
				</div>
				</div>
				</div>
				</li>`);

			})
			//Categories inside a category, the father is placed on the bar
			let underBarCategories = data.pageCategories.filter(pc=> pc.location !=="Barra");
			underBarCategories.forEach((pc)=>{
				$(`#page-menu-column-2-${pc.location.replace(/\s/g, '')}`).append(`

					<div class="dropdown">
					<a class="mbr-black text-black dropdown-item dropdown-toggle display-4" href="index.html" data-toggle="dropdown-submenu" aria-expanded="true">${pc.name}</a>
					<div class="dropdown-menu dropdown-submenu" id = "under-bar-category-${pc.name.replace(/\s/g, '')}">
					</div>
					</div>

					`);
				})

				$.get("https://intellgentcms.herokuapp.com/api/pages",data=>{

					$.get("https://intellgentcms.herokuapp.com/api/blogPages",data2=>{
						const allPages = [...data.pages,...data2.blogPages];

						allPages.filter(p=>p.pageCategory==="Barra").forEach(p=>{
							let blog = !p.image
							if(!blog){
								$("#navbarSupportedContent").children().first().children().last().after(`
									<li class="nav-item work-please">
									<a class="nav-link link mbr-black text-black display-4" href='interna.html?name=${p.url}'>${p.name}</a>
									<!--<a class="nav-link link mbr-black text-black display-4" href='interna?name=${p.url}'>${p.name}</a>-->
									</li>
									`);
								}
								else{
									$("#navbarSupportedContent").children().first().children().last().after(`
										<li class="nav-item work-please">
										<!--<a class="nav-link link mbr-black text-black display-4" href='blog?name=${p.url}&blog=1'>${p.name}</a>-->
										<a class="nav-link link mbr-black text-black display-4" href='blog.html?name=${p.url}&blog=1'>${p.name}</a>
										</li>
										`);
									}


								})
								//pages inside categories inside a category, the father category is placed on the bar
								let underUnderBarPages = allPages.filter(p=> underBarCategories.find(  pc=> pc.name===p.pageCategory) )

								//pages inside a category placed on the bar
								let underBarPages = allPages.filter(p=> !underBarCategories.find(pc=>pc.name===p.pageCategory) )

								//pages inside a category placed on the bar x2
								//let lastUnderBarPages = underBarPages.splice(4);
								underBarPages.forEach(p=>{
									if($(`#page-menu-column-1-${p.pageCategory.replace(/\s/g, '')}`).children().length < 4){
										let blog = !p.image
										if(!blog){
											$(`#page-menu-column-1-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="interna.html?name=${p.url} " id ="nav-bar-item" >${p.name}</a>`);
											// $(`#page-menu-column-1-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="interna?name=${p.url} " id ="nav-bar-item" >${p.name}</a>`);
										}
										else{
											$(`#page-menu-column-1-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="blog.html?name=${p.url}&blog=1" id ="nav-bar-item"  >${p.name}</a>`);
											// $(`#page-menu-column-1-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="blog?name=${p.url}&blog=1" id ="nav-bar-item" >${p.name}</a>`);
										}
									}
									else{
										let blog = !p.image
										if(!blog){
											$(`#page-menu-column-2-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 p-0 m-0" href="interna.html?name=${p.url}" aria-expanded="false " id ="nav-bar-item">${p.name}</a>`);
											// $(`#page-menu-column-2-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 p-0 m-0" href="interna?name=${p.url}" aria-expanded="false " id ="nav-bar-item">${p.name}</a>`);

										}
										else{
											$(`#page-menu-column-2-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 p-0 m-0" href="blog.html?name=${p.url}&blog=1" aria-expanded="false " id ="nav-bar-item">${p.name}</a>`);
											// $(`#page-menu-column-2-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 p-0 m-0" href="blog?name=${p.url}&blog=1" aria-expanded="false " id ="nav-bar-item">${p.name}</a>`);
										}

									}
								})
								// lastUnderBarPages.forEach(p=>{
								// 	$(`#page-menu-column-2-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 p-0 m-0" href="interna.html?name=${p.url}" aria-expanded="false " id ="nav-bar-item">${p.name}</a>`);
								// })

								underUnderBarPages.forEach(p=>{
									let blog = !p.image
									if(!blog){
										$(`#under-bar-category-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="interna.html?name=${p.url}" >${p.name}</a>`);
										// $(`#under-bar-category-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="interna?name=${p.url}" >${p.name}</a>`);
										}
									else{
										$(`#under-bar-category-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="blog.html?name=${p.url}&blog=1" >${p.name}</a>`);
										// $(`#under-bar-category-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="blog?name=${p.url}&blog=1" >${p.name}</a>`);
									}
								})

								$(".dropdown").mouseover((event)=>{$(event.currentTarget).addClass("open") })
								$(".dropdown").mouseout((event)=>{ $(event.currentTarget).removeClass("open") })
								$(".dropdown").mouseout((event)=>{ $(event.currentTarget).removeClass("open") })

								$(".nav-item").mouseenter((event)=>{
									$("js-float-line").append('<li class="main-menu-animated-line bottom"></li>')
									const left = $(event.currentTarget).position().left
									const width = $(event.currentTarget).width()
									$(".main-menu-animated-line ").attr("style",`width: ${width}px; left:${left}px;`)
								})

							})//get blog pages
						})//get pages

					})//get page categories

					if (getUrlParameter("entry")){


						$.get(`https://intellgentcms.herokuapp.com/api/blogPage?url=${getUrlParameter("name")}`,data=>{
							const index = Number.parseInt(getUrlParameter("entry"));
							const entry = data.blogPage.entries[index];
							$("#title").html(entry.title);

							$("#page-title").html("Comsistelco");
							let date = new Date (entry.date)
							date.setHours(date.getHours()-5);
							$("#entry-date").append(`<p class = "entry-text">Fecha de publicación: ${date.toISOString().split("T")[0]}</p>`);

							$("#entry-content2").append(`<p class = "entry-text">${entry.content2}</p>`);
							$("#entry-content3").append(`<p class = "entry-text">${entry.content3}</p>`);
							$("#entry-image").append(`<div class = "entry-image" style = 'background:url("${entry.image}")'></div>`);
							$("#entry-content4").append(`<p class = "entry-text">${entry.content4}</p>`);




						})//Get blog pages by name


					}else if(getUrlParameter("blog")){
						$.get(`https://intellgentcms.herokuapp.com/api/blogPage?url=${getUrlParameter("name")}`,data=>{
							$("#title").html(data.blogPage.name);
							$("#page-title").html(data.blogPage.name);

							data.blogPage.entries.forEach((e,i)=>{
								$("#entry-container").append(`<a class="entry-subcontainer" id= 'entry-container${i}'href = "entry.html?name=${getUrlParameter("name")}&entry=${i}" ></a>`);
								// $("#entry-container").append(`<a class="entry-subcontainer" id= 'entry-container${i}'href = "entry?name=${getUrlParameter("name")}&entry=${i}" ></a>`);
								$(`#entry-container${i}`).append(`<div class = 'entry' id= 'entry${i}' ></div>`);

								$(`#entry${i}`).css("background",`url("${e.thumbNail}")`);
								$(`#entry${i}`).append(`<span class = 'entry entry-info' id= 'entrytitle${i}' > <div class = "titili-quidri"> ${e.title} </div> </span>`)
								$(`#entrytitle${i}`).append(`<span  class="disglosi-quidri" >${e.content1}</span>`);

							})
						})//Get blog pages by name
					}else{
						$.get(`https://intellgentcms.herokuapp.com/api/page?url=${getUrlParameter("name")}`,data=>{
							$("#title").html(data.page.name);
							$("#page-title").html(data.page.name);

							$("#banner").css("background",`url("${data.page.image}")`);
							$("#banner-description").css("background",`url("${data.page.image}")`);
							data.page.sections.forEach((s,i)=>{
								$("#sectioncontainer").append(`<div class = 'section' id= 'section${i}' ></div>`);
								$(`#section${i}`).append(`<p class = 'section-title'>${s.title}</p>`);
								$(`#section${i}`).append(`<h3 class='mbr-section-subtitle mbr-fonts-style mb-4 mbr-light display-5 section-content'>${s.content}</h3>`);
								$(`#section${i}`).append(`<div class = 'section-img-container'></div>`);

								s.images.forEach((img,j)=>{
									$(".section-img-container").append(`<img class = 'section-img' src = ${img}></img>`);


								})
							})

						})//Get page by name
					}


				});//Document ready
