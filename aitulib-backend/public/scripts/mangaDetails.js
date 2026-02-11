let currentUser = null;
let currentMangaId = null;


function getCurrentUser() {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
        try {
            return JSON.parse(userData);
        } catch (e) {
            console.error('Error parsing user data:', e);
            return null;
        }
    }
    return null;
}


function getAuthToken() {
    return localStorage.getItem('accessToken');
}


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}


function showError(message, elementId = 'comment-error') {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function hideError(elementId = 'comment-error') {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

async function loadComments() {
    try {
        const response = await fetch(`/api/comments?mangaId=${currentMangaId}`);

        if (!response.ok) {
            throw new Error('Failed to load comments');
        }

        const comments = await response.json();
        renderComments(comments);
    } catch (err) {
        console.error("Error loading comments:", err);
        const commList = document.getElementById('comments-list');
        commList.innerHTML = '<p class="comments-empty">Failed to load comments. Please try again later.</p>';
    }
}

function renderComments(comments) {
    const commList = document.getElementById('comments-list');

    if (!comments || comments.length === 0) {
        commList.innerHTML = '<p class="comments-empty">No comments yet. Be the first!</p>';
        return;
    }

    commList.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
    attachCommentHandlers();
}

function createCommentHTML(comment) {
    const isOwner = currentUser && comment.userId && comment.userId._id === currentUser.id;
    const canModerate = currentUser && (currentUser.role === 'admin' || currentUser.role === 'moderator');
    const canEdit = isOwner;
    const canDelete = isOwner || canModerate;

    return `
    <div class="comment-item" data-comment-id="${comment._id}">
      <div class="comment-user">
        <span>${comment.userId?.username || 'Anonymous'}</span>
        ${isOwner ? '<span class="comment-user-badge">(You)</span>' : ''}
      </div>
      <div class="comment-text-display">${escapeHtml(comment.text)}</div>
      <div class="edit-form">
        <textarea class="edit-textarea">${escapeHtml(comment.text)}</textarea>
        <div class="edit-actions">
          <button class="comment-btn save-edit">Save</button>
          <button class="comment-btn cancel-edit">Cancel</button>
        </div>
      </div>
      <div class="comment-date">${formatDate(comment.createdAt)}</div>
      ${(canEdit || canDelete) ? `
        <div class="comment-actions">
          ${canEdit ? '<button class="comment-btn edit-btn">Edit</button>' : ''}
          ${canDelete ? '<button class="comment-btn delete delete-btn">Delete</button>' : ''}
        </div>
      ` : ''}
    </div>
  `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function createComment() {
    const textarea = document.getElementById('comment-text');
    const text = textarea.value.trim();

    if (!text) {
        showError('Please write a comment');
        return;
    }

    try {
        const token = getAuthToken();
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                mangaId: currentMangaId,
                text: text
            })
        });

        if (response.ok) {
            textarea.value = '';
            hideError();
            await loadComments();
        } else {
            const data = await response.json();
            showError(data.message || 'Failed to post comment');
        }
    } catch (err) {
        console.error('Error posting comment:', err);
        showError('Failed to post comment. Please try again.');
    }
}

async function updateComment(commentId, newText) {
    if (!newText.trim()) {
        alert('Comment cannot be empty');
        return;
    }

    try {
        const token = getAuthToken();
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: newText })
        });

        if (response.ok) {
            await loadComments();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to update comment');
        }
    } catch (err) {
        console.error('Error updating comment:', err);
        alert('Failed to update comment');
    }
}


async function deleteComment(commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) {
        return;
    }

    try {
        const token = getAuthToken();
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            await loadComments();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to delete comment');
        }
    } catch (err) {
        console.error('Error deleting comment:', err);
        alert('Failed to delete comment');
    }
}

function attachCommentHandlers() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const commentItem = this.closest('.comment-item');
            const textDisplay = commentItem.querySelector('.comment-text-display');
            const editForm = commentItem.querySelector('.edit-form');

            textDisplay.style.display = 'none';
            editForm.classList.add('active');
        });
    });

    document.querySelectorAll('.cancel-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const commentItem = this.closest('.comment-item');
            const textDisplay = commentItem.querySelector('.comment-text-display');
            const editForm = commentItem.querySelector('.edit-form');

            textDisplay.style.display = 'block';
            editForm.classList.remove('active');
        });
    });

    document.querySelectorAll('.save-edit').forEach(btn => {
        btn.addEventListener('click', async function() {
            const commentItem = this.closest('.comment-item');
            const commentId = commentItem.dataset.commentId;
            const newText = commentItem.querySelector('.edit-textarea').value;

            await updateComment(commentId, newText);
        });
    });


    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const commentItem = this.closest('.comment-item');
            const commentId = commentItem.dataset.commentId;

            await deleteComment(commentId);
        });
    });
}


async function loadMangaDetails(mangaId) {
    try {
        const response = await fetch(`/api/manga/${mangaId}`);

        if (!response.ok) {
            if (response.status === 404) {
                document.getElementById('manga-content').innerHTML = "<h1>Manga not found</h1>";
                return;
            }
            throw new Error('Failed to load manga');
        }

        const manga = await response.json();
        renderMangaDetails(manga);

    } catch (err) {
        console.error("Error loading manga details:", err);
        document.getElementById('manga-content').innerHTML = "<h1>Error loading manga</h1>";
    }
}

function renderMangaDetails(manga) {
    document.getElementById('manga-img').src = manga.coverImage || '/assets/default-cover.jpg';
    document.getElementById('manga-title').textContent = manga.title;
    document.getElementById('manga-status').textContent = manga.status;
    document.getElementById('manga-author').textContent = manga.author || 'Unknown';
    document.getElementById('manga-desc').textContent = manga.description || 'No description available.';

    const genresDiv = document.getElementById('manga-genres');
    genresDiv.innerHTML = '';

    if (manga.genres && manga.genres.length > 0) {
        manga.genres.forEach(genre => {
            const span = document.createElement('span');
            span.className = 'genre-badge';
            span.textContent = genre;
            genresDiv.appendChild(span);
        });
    }
}


function initializePage() {
    currentUser = getCurrentUser();

    if (currentUser) {
        document.getElementById('comment-form-container').style.display = 'block';
        document.getElementById('login-prompt').style.display = 'none';
    } else {
        document.getElementById('comment-form-container').style.display = 'none';
        document.getElementById('login-prompt').style.display = 'block';
    }

    const urlParams = new URLSearchParams(window.location.search);
    let mangaId = urlParams.get('id');

    if (!mangaId) {
        const pathParts = window.location.pathname.split('/');
        mangaId = pathParts[pathParts.length - 1];
    }

    if (!mangaId || mangaId === 'manga.html') {
        console.error("Manga ID not found in URL");
        return;
    }

    currentMangaId = mangaId;

    loadMangaDetails(mangaId);
    loadComments();

    const submitBtn = document.getElementById('submit-comment');
    if (submitBtn) {
        submitBtn.addEventListener('click', createComment);
    }

    const commentTextarea = document.getElementById('comment-text');
    if (commentTextarea) {
        commentTextarea.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                createComment();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializePage);